import os
import json
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from typing import Optional, List
from datetime import datetime

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

app = FastAPI(title="ClusterMind AI/ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent / "data"
DATA_DIR.mkdir(exist_ok=True)
MODEL_DIR = Path(__file__).parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

DATASET_PATH = DATA_DIR / "dataset.csv"
DATASET_META_PATH = DATA_DIR / "dataset_meta.json"

class TrainRequest(BaseModel):
    algorithm: str = "kmeans"
    clusters: int = 5

class RecommendRequest(BaseModel):
    customer_id: str
    top_k: int = 5

def load_dataset() -> Optional[pd.DataFrame]:
    if DATASET_PATH.exists():
        return pd.read_csv(DATASET_PATH)
    return None

def save_dataset_meta(meta: dict):
    with open(DATASET_META_PATH, "w") as f:
        json.dump(meta, f, default=str)

def load_dataset_meta() -> dict:
    if DATASET_META_PATH.exists():
        with open(DATASET_META_PATH, "r") as f:
            return json.load(f)
    return {}

def get_feature_columns(df: pd.DataFrame) -> List[str]:
    exclude = ["customer_id", "customer_id", "id", "target", "label", "segment"]
    return [c for c in df.columns if c not in exclude and df[c].dtype in ["int64", "float64", "int32", "float32"]]

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "ai-ml"}

@app.post("/api/ml/dataset/ensure")
def ensure_dataset(force: bool = Query(False)):
    if DATASET_PATH.exists() and not force:
        df = load_dataset()
        meta = load_dataset_meta()
        return {
            "status": "exists",
            "rows": len(df),
            "columns": list(df.columns),
            "meta": meta
        }
    return {"status": "not_found", "message": "Dataset not found. Use /api/ml/dataset/upload to upload."}

@app.post("/api/ml/dataset/upload")
async def upload_dataset(file: UploadFile = File(...), target_column: str = Form("segment")):
    if not file.filename.endswith(".csv"):
        raise HTTPException(400, "Only CSV files supported")
    
    content = await file.read()
    df = pd.read_csv(pd.io.common.BytesIO(content))
    
    df.to_csv(DATASET_PATH, index=False)
    
    meta = {
        "filename": file.filename,
        "uploaded_at": datetime.now().isoformat(),
        "rows": len(df),
        "columns": list(df.columns),
        "target_column": target_column,
        "dtypes": {c: str(df[c].dtype) for c in df.columns}
    }
    save_dataset_meta(meta)
    
    return {
        "status": "uploaded",
        "rows": len(df),
        "columns": list(df.columns),
        "meta": meta
    }

@app.delete("/api/ml/dataset")
def delete_dataset():
    if DATASET_PATH.exists():
        DATASET_PATH.unlink()
    if DATASET_META_PATH.exists():
        DATASET_META_PATH.unlink()
    for model_file in MODEL_DIR.glob("*.joblib"):
        model_file.unlink()
    return {"status": "deleted"}

@app.get("/api/ml/dataset")
def get_dataset_info():
    if not DATASET_PATH.exists():
        raise HTTPException(404, "No dataset uploaded")
    df = load_dataset()
    meta = load_dataset_meta()
    preview = df.head(10).to_dict(orient="records")
    return {
        "rows": len(df),
        "columns": list(df.columns),
        "dtypes": {c: str(df[c].dtype) for c in df.columns},
        "preview": preview,
        "meta": meta
    }

@app.post("/api/ml/train")
def train_model(request: TrainRequest):
    if not DATASET_PATH.exists():
        raise HTTPException(404, "No dataset uploaded. Upload dataset first.")
    
    df = load_dataset()
    meta = load_dataset_meta()
    target_col = meta.get("target_column", "segment")
    
    feature_cols = get_feature_columns(df)
    if not feature_cols:
        raise HTTPException(400, "No numeric features found for training")
    
    X = df[feature_cols].fillna(0)
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    if target_col in df.columns:
        y = df[target_col]
    else:
        y = None
    
    model_name = f"{request.algorithm}_{request.clusters}clusters"
    model_path = MODEL_DIR / f"{model_name}.joblib"
    
    if request.algorithm == "kmeans":
        model = KMeans(n_clusters=request.clusters, random_state=42, n_init=10)
        labels = model.fit_predict(X_scaled)
        silhouette = silhouette_score(X_scaled, labels) if len(set(labels)) > 1 else 0
        
        model_data = {
            "model": model,
            "scaler": scaler,
            "feature_cols": feature_cols,
            "algorithm": "kmeans",
            "clusters": request.clusters,
            "silhouette_score": silhouette,
            "cluster_centers": model.cluster_centers_.tolist(),
            "trained_at": datetime.now().isoformat()
        }
        
    elif request.algorithm == "dbscan":
        model = DBSCAN(eps=0.5, min_samples=5)
        labels = model.fit_predict(X_scaled)
        n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
        silhouette = silhouette_score(X_scaled, labels) if n_clusters > 1 else 0
        
        model_data = {
            "model": model,
            "scaler": scaler,
            "feature_cols": feature_cols,
            "algorithm": "dbscan",
            "clusters": n_clusters,
            "silhouette_score": silhouette,
            "trained_at": datetime.now().isoformat()
        }
        
    elif request.algorithm == "hierarchical":
        model = AgglomerativeClustering(n_clusters=request.clusters)
        labels = model.fit_predict(X_scaled)
        silhouette = silhouette_score(X_scaled, labels) if len(set(labels)) > 1 else 0
        
        model_data = {
            "model": model,
            "scaler": scaler,
            "feature_cols": feature_cols,
            "algorithm": "hierarchical",
            "clusters": request.clusters,
            "silhouette_score": silhouette,
            "trained_at": datetime.now().isoformat()
        }
        
    elif request.algorithm == "random_forest":
        if y is None:
            raise HTTPException(400, "Target column required for Random Forest")
        
        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        model_data = {
            "model": model,
            "scaler": scaler,
            "feature_cols": feature_cols,
            "algorithm": "random_forest",
            "accuracy": accuracy,
            "trained_at": datetime.now().isoformat(),
            "classes": model.classes_.tolist()
        }
        
    else:
        raise HTTPException(400, f"Unknown algorithm: {request.algorithm}")
    
    joblib.dump(model_data, model_path)
    
    return {
        "status": "trained",
        "model": model_name,
        "algorithm": request.algorithm,
        "clusters": request.clusters,
        "silhouette_score": model_data.get("silhouette_score"),
        "accuracy": model_data.get("accuracy"),
        "feature_importance": model_data.get("model", {}).feature_importances_.tolist() if hasattr(model_data.get("model", {}), "feature_importances_") else None,
        "trained_at": model_data["trained_at"]
    }

@app.get("/api/ml/models")
def list_models():
    models = []
    for model_file in MODEL_DIR.glob("*.joblib"):
        try:
            data = joblib.load(model_file)
            models.append({
                "name": model_file.stem,
                "algorithm": data.get("algorithm"),
                "clusters": data.get("clusters"),
                "silhouette_score": data.get("silhouette_score"),
                "accuracy": data.get("accuracy"),
                "trained_at": data.get("trained_at")
            })
        except:
            pass
    return {"models": models}

@app.get("/api/ml/segments")
def get_segments():
    if not DATASET_PATH.exists():
        raise HTTPException(404, "No dataset uploaded")
    
    model_files = list(MODEL_DIR.glob("*.joblib"))
    if not model_files:
        raise HTTPException(404, "No trained model found. Train a model first.")
    
    latest_model = max(model_files, key=lambda f: f.stat().st_mtime)
    data = joblib.load(latest_model)
    
    if "model" not in data:
        raise HTTPException(400, "Model not suitable for segmentation")
    
    df = load_dataset()
    feature_cols = data["feature_cols"]
    scaler = data["scaler"]
    model = data["model"]
    
    X = df[feature_cols].fillna(0)
    X_scaled = scaler.transform(X)
    labels = model.predict(X_scaled) if hasattr(model, "predict") else model.labels_
    
    df["segment"] = labels
    segments = []
    for label in sorted(df["segment"].unique()):
        if label == -1:
            continue
        subset = df[df["segment"] == label]
        segments.append({
            "segment_id": int(label),
            "name": f"Segment {label}",
            "count": int(subset.shape[0]),
            "percentage": round(subset.shape[0] / len(df) * 100, 2),
            "avg_features": {c: round(float(subset[c].mean()), 2) for c in feature_cols}
        })
    
    return {
        "model": latest_model.stem,
        "algorithm": data.get("algorithm"),
        "segments": segments,
        "total_customers": len(df)
    }

@app.get("/api/ml/behaviour")
def get_behaviour():
    if not DATASET_PATH.exists():
        raise HTTPException(404, "No dataset uploaded")
    
    df = load_dataset()
    feature_cols = get_feature_columns(df)
    
    stats = []
    for col in feature_cols:
        stats.append({
            "feature": col,
            "mean": round(float(df[col].mean()), 2),
            "std": round(float(df[col].std()), 2),
            "min": round(float(df[col].min()), 2),
            "max": round(float(df[col].max()), 2)
        })
    
    corr_matrix = df[feature_cols].corr().round(2).to_dict()
    
    return {
        "total_customers": len(df),
        "features": stats,
        "correlation_matrix": corr_matrix,
        "summary": {
            "total_features": len(feature_cols),
            "total_records": len(df)
        }
    }

@app.post("/api/ml/recommendations/generate")
def generate_recommendations(request: RecommendRequest):
    if not DATASET_PATH.exists():
        raise HTTPException(404, "No dataset uploaded")
    
    model_files = list(MODEL_DIR.glob("*random_forest*.joblib"))
    if not model_files:
        raise HTTPException(404, "No recommendation model trained. Train Random Forest model first.")
    
    latest_model = max(model_files, key=lambda f: f.stat().st_mtime)
    data = joblib.load(latest_model)
    
    if data.get("algorithm") != "random_forest":
        raise HTTPException(400, "Model is not a recommendation model (Random Forest)")
    
    df = load_dataset()
    if request.customer_id not in df.get("customer_id", pd.Series()).values:
        raise HTTPException(404, f"Customer {request.customer_id} not found")
    
    customer_row = df[df["customer_id"] == request.customer_id].iloc[0]
    feature_cols = data["feature_cols"]
    scaler = data["scaler"]
    model = data["model"]
    
    X = customer_row[feature_cols].fillna(0).values.reshape(1, -1)
    X_scaled = scaler.transform(X)
    
    probs = model.predict_proba(X_scaled)[0]
    classes = model.classes_
    
    top_indices = np.argsort(probs)[::-1][:request.top_k]
    recommendations = [
        {"segment": classes[i], "probability": round(float(probs[i]), 4)}
        for i in top_indices
    ]
    
    return {
        "customer_id": request.customer_id,
        "recommendations": recommendations,
        "generated_at": datetime.now().isoformat()
    }

@app.get("/api/ml/recommendations")
def get_recommendations(customer_id: Optional[str] = None, top_k: int = 5):
    if not DATASET_PATH.exists():
        raise HTTPException(404, "No dataset uploaded")
    
    model_files = list(MODEL_DIR.glob("*random_forest*.joblib"))
    if not model_files:
        raise HTTPException(404, "No recommendation model trained")
    
    latest_model = max(model_files, key=lambda f: f.stat().st_mtime)
    data = joblib.load(latest_model)
    
    if data.get("algorithm") != "random_forest":
        raise HTTPException(400, "Model is not a recommendation model")
    
    df = load_dataset()
    feature_cols = data["feature_cols"]
    scaler = data["scaler"]
    model = data["model"]
    
    if customer_id:
        if customer_id not in df.get("customer_id", pd.Series()).values:
            raise HTTPException(404, f"Customer {customer_id} not found")
        customers = df[df["customer_id"] == customer_id]
    else:
        customers = df.head(100)
    
    results = []
    for _, row in customers.iterrows():
        X = row[feature_cols].fillna(0).values.reshape(1, -1)
        X_scaled = scaler.transform(X)
        probs = model.predict_proba(X_scaled)[0]
        classes = model.classes_
        top_indices = np.argsort(probs)[::-1][:top_k]
        recs = [
            {"segment": classes[i], "probability": round(float(probs[i]), 4)}
            for i in top_indices
        ]
        results.append({
            "customer_id": row.get("customer_id", "unknown"),
            "recommendations": recs
        })
    
    return {"results": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
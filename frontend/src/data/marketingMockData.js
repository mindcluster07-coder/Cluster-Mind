export const CURRENT_DATE_RANGE = {
  label: '01 May 2024 - 31 May 2024',
  start: '2024-05-01',
  end: '2024-05-31',
}

export const KPI = {
  totalCustomers: 12456,
  activeSegments: 5,
  modelEvaluation: 92.45,
  activeCampaigns: 23,
  revenueFromCampaigns: 875230,
}

export const SEGMENT_DISTRIBUTION = [
  { name: 'Premium Customers', value: 35, color: '#7c3aed' },
  { name: 'Loyal Customers', value: 25, color: '#2563eb' },
  { name: 'Price Sensitive', value: 20, color: '#06b6d4' },
  { name: 'Inactive Customers', value: 10, color: '#94a3b8' },
  { name: 'New Customers', value: 10, color: '#10b981' },
]

export const SEGMENT_CLUSTERS = [
  { x: 8, y: 9, name: 'Premium Customers', color: '#7c3aed' },
  { x: 9, y: 8, name: 'Premium Customers', color: '#7c3aed' },
  { x: 10, y: 9, name: 'Premium Customers', color: '#7c3aed' },
  { x: 8, y: 10, name: 'Premium Customers', color: '#7c3aed' },
  { x: 11, y: 8, name: 'Premium Customers', color: '#7c3aed' },
  { x: 6, y: 7, name: 'Loyal Customers', color: '#2563eb' },
  { x: 7, y: 6, name: 'Loyal Customers', color: '#2563eb' },
  { x: 6, y: 6, name: 'Loyal Customers', color: '#2563eb' },
  { x: 5, y: 7, name: 'Loyal Customers', color: '#2563eb' },
  { x: 7, y: 5, name: 'Loyal Customers', color: '#2563eb' },
  { x: 3, y: 4, name: 'Price Sensitive', color: '#06b6d4' },
  { x: 4, y: 3, name: 'Price Sensitive', color: '#06b6d4' },
  { x: 3, y: 3, name: 'Price Sensitive', color: '#06b6d4' },
  { x: 4, y: 4, name: 'Price Sensitive', color: '#06b6d4' },
  { x: 2, y: 3, name: 'Price Sensitive', color: '#06b6d4' },
  { x: 1, y: 1, name: 'Inactive Customers', color: '#94a3b8' },
  { x: 2, y: 1, name: 'Inactive Customers', color: '#94a3b8' },
  { x: 1, y: 2, name: 'Inactive Customers', color: '#94a3b8' },
  { x: 2, y: 2, name: 'Inactive Customers', color: '#94a3b8' },
  { x: 0, y: 1, name: 'Inactive Customers', color: '#94a3b8' },
  { x: 9, y: 2, name: 'New Customers', color: '#10b981' },
  { x: 10, y: 2, name: 'New Customers', color: '#10b981' },
  { x: 9, y: 3, name: 'New Customers', color: '#10b981' },
  { x: 10, y: 1, name: 'New Customers', color: '#10b981' },
  { x: 11, y: 2, name: 'New Customers', color: '#10b981' },
]

export const CAMPAIGN_PERFORMANCE = [
  { name: 'Summer Sale', value: 78 },
  { name: 'Electronics Fest', value: 65 },
  { name: 'Loyalty Week', value: 86 },
  { name: 'New User Offer', value: 72 },
  { name: 'Clearance Sale', value: 55 },
]

export const AI_INSIGHTS = {
  totalRecommendations: 45230,
  acceptedRecommendations: 18765,
  conversionRate: 41.52,
  averageOrderValue: 6750,
}

export const RECENT_CAMPAIGNS = [
  {
    id: 1,
    name: 'Summer Sale Campaign',
    segment: 'Premium Customers',
    channel: 'Email, WhatsApp',
    startDate: '01 May 2024',
    endDate: '31 May 2024',
    status: 'Active',
    performance: 78,
  },
  {
    id: 2,
    name: 'Electronics Festival',
    segment: 'Loyal Customers',
    channel: 'Email, Push Notification',
    startDate: '05 May 2024',
    endDate: '20 May 2024',
    status: 'Active',
    performance: 65,
  },
  {
    id: 3,
    name: 'New User Welcome Offer',
    segment: 'New Customers',
    channel: 'Email',
    startDate: '10 May 2024',
    endDate: '30 May 2024',
    status: 'Completed',
    performance: 72,
  },
  {
    id: 4,
    name: 'Clearance Sale Drive',
    segment: 'Price Sensitive',
    channel: 'WhatsApp, Email',
    startDate: '02 May 2024',
    endDate: '15 May 2024',
    status: 'Completed',
    performance: 55,
  },
  {
    id: 5,
    name: 'Loyalty Points Booster',
    segment: 'Loyal Customers',
    channel: 'Push Notification',
    startDate: '12 May 2024',
    endDate: '28 May 2024',
    status: 'Paused',
    performance: 86,
  },
]

export const MODEL_INFO = {
  kmeans: {
    name: 'K-Means Clustering',
    status: 'Active',
    lastTrained: '30 May 2024',
    evaluation: 92.45,
    clusters: 5,
  },
}

export const DATASET = {
  name: 'customer_behavior.csv',
  records: 12456,
  columns: 18,
  uploadDate: '25 May 2024',
  status: 'Ready for Analysis',
  preview: [
    { customer_id: 'C1001', gender: 'F', age: 28, city: 'Mumbai', spend: 45800, orders: 12, category: 'Electronics', device: 'Mobile' },
    { customer_id: 'C1002', gender: 'M', age: 34, city: 'Delhi', spend: 22000, orders: 7, category: 'Fashion', device: 'Desktop' },
    { customer_id: 'C1003', gender: 'F', age: 41, city: 'Bengaluru', spend: 67500, orders: 15, category: 'Electronics', device: 'Mobile' },
    { customer_id: 'C1004', gender: 'M', age: 22, city: 'Pune', spend: 8400, orders: 3, category: 'Grocery', device: 'Mobile' },
    { customer_id: 'C1005', gender: 'F', age: 30, city: 'Hyderabad', spend: 31200, orders: 9, category: 'Beauty', device: 'Tablet' },
    { customer_id: 'C1006', gender: 'M', age: 45, city: 'Chennai', spend: 109000, orders: 18, category: 'Electronics', device: 'Desktop' },
    { customer_id: 'C1007', gender: 'F', age: 26, city: 'Kolkata', spend: 15600, orders: 5, category: 'Fashion', device: 'Mobile' },
    { customer_id: 'C1008', gender: 'M', age: 38, city: 'Ahmedabad', spend: 47800, orders: 11, category: 'Home', device: 'Mobile' },
  ],
}

export const BEHAVIOUR = {
  stats: [
    { label: 'Total Purchases', value: '48,210', change: '+6.4%' },
    { label: 'Average Spending', value: '₹4,215', change: '+3.1%' },
    { label: 'Purchase Frequency', value: '3.8 / month', change: '+0.2' },
    { label: 'Average Order Value', value: '₹6,750', change: '+5.0%' },
    { label: 'Wishlist Activity', value: '8,942', change: '+12.3%' },
    { label: 'Cart Activity', value: '15,630', change: '+9.8%' },
    { label: 'Search Activity', value: '27,450', change: '+18.5%' },
  ],
  purchaseFrequency: [
    { name: '0-1', value: 18 },
    { name: '2-3', value: 27 },
    { name: '4-5', value: 24 },
    { name: '6-10', value: 19 },
    { name: '10+', value: 12 },
  ],
  spendingDistribution: [
    { name: '< ₹5k', value: 28 },
    { name: '₹5k-15k', value: 31 },
    { name: '₹15k-35k', value: 22 },
    { name: '₹35k-70k', value: 13 },
    { name: '70k+', value: 6 },
  ],
  favouriteCategories: [
    { name: 'Electronics', value: 34 },
    { name: 'Fashion', value: 24 },
    { name: 'Home', value: 16 },
    { name: 'Beauty', value: 14 },
    { name: 'Grocery', value: 12 },
  ],
  customerActivity: [
    { name: 'May 01', views: 4200, carts: 1200, purchases: 480 },
    { name: 'May 05', views: 5100, carts: 1450, purchases: 560 },
    { name: 'May 10', views: 4600, carts: 1380, purchases: 520 },
    { name: 'May 15', views: 6800, carts: 2100, purchases: 790 },
    { name: 'May 20', views: 5900, carts: 1780, purchases: 640 },
    { name: 'May 25', views: 7300, carts: 2400, purchases: 880 },
    { name: 'May 31', views: 8100, carts: 2650, purchases: 960 },
  ],
}

export const SEGMENTS = [
  { name: 'Premium Customer', customers: 4359, percentage: 35, avgSpending: '₹45,000', frequency: 'High', type: 'High Value' },
  { name: 'Loyal Customer', customers: 3114, percentage: 25, avgSpending: '₹25,000', frequency: 'High', type: 'Repeat Buyer' },
  { name: 'Price Sensitive', customers: 2491, percentage: 20, avgSpending: '₹8,500', frequency: 'Medium', type: 'Discount Driven' },
  { name: 'Inactive', customers: 1245, percentage: 10, avgSpending: '₹2,500', frequency: 'Low', type: 'Inactive' },
  { name: 'New Customer', customers: 1247, percentage: 10, avgSpending: '₹3,000', frequency: 'Low', type: 'New' },
]

export const RECOMMENDATIONS = {
  stats: [
    { label: 'Total Recommendations', value: '45,230' },
    { label: 'Accepted Recommendations', value: '18,765' },
    { label: 'Conversion Rate', value: '41.52%' },
    { label: 'Average Recommendation Value', value: '₹6,750' },
  ],
  product: [
    { segment: 'Premium Customer', item: 'MacBook Air', reason: 'High electronics interest', type: 'Product', status: 'Active' },
    { segment: 'Price Sensitive', item: 'Budget Smartphone', reason: 'Price preference', type: 'Product', status: 'Active' },
    { segment: 'Loyal Customer', item: 'Smartwatch Series 5', reason: 'Repeat accessory buyer', type: 'Product', status: 'Active' },
    { segment: 'New Customer', item: 'Starter Gift Pack', reason: 'First-purchase incentive', type: 'Product', status: 'Active' },
  ],
  offer: [
    { segment: 'Loyal Customer', item: 'Free Shipping Weekend', reason: 'High order frequency', type: 'Offer', status: 'Active' },
    { segment: 'Premium Customer', item: 'Early Access Sale', reason: 'High value engagement', type: 'Offer', status: 'Active' },
  ],
  coupon: [
    { segment: 'New Customer', item: 'WELCOME10', reason: 'New customer onboarding', type: 'Coupon', status: 'Active' },
    { segment: 'Price Sensitive', item: 'SAVE500', reason: 'Discount driven behaviour', type: 'Coupon', status: 'Active' },
  ],
  campaign: [
    { segment: 'Premium Customers', item: 'Premium Week Campaign', reason: 'High spend cluster', type: 'Campaign', status: 'Scheduled' },
    { segment: 'Inactive', item: 'Win-Back Campaign', reason: 'Re-engagement needed', type: 'Campaign', status: 'Draft' },
  ],
}

export const CAMPAIGNS = [
  {
    id: 1,
    name: 'Summer Sale Campaign',
    segment: 'Premium Customers',
    channel: 'Email, WhatsApp',
    startDate: '01 May 2024',
    endDate: '31 May 2024',
    status: 'Active',
    performance: 78,
  },
  {
    id: 2,
    name: 'Electronics Festival',
    segment: 'Loyal Customers',
    channel: 'Email, Push Notification',
    startDate: '05 May 2024',
    endDate: '20 May 2024',
    status: 'Active',
    performance: 65,
  },
  {
    id: 3,
    name: 'New User Welcome Offer',
    segment: 'New Customers',
    channel: 'Email',
    startDate: '10 May 2024',
    endDate: '30 May 2024',
    status: 'Completed',
    performance: 72,
  },
  {
    id: 4,
    name: 'Clearance Sale Drive',
    segment: 'Price Sensitive',
    channel: 'WhatsApp, Email',
    startDate: '02 May 2024',
    endDate: '15 May 2024',
    status: 'Completed',
    performance: 55,
  },
  {
    id: 5,
    name: 'Loyalty Points Booster',
    segment: 'Loyal Customers',
    channel: 'Push Notification',
    startDate: '12 May 2024',
    endDate: '28 May 2024',
    status: 'Paused',
    performance: 86,
  },
  {
    id: 6,
    name: 'Monsoon Gear Launch',
    segment: 'Price Sensitive',
    channel: 'Email, WhatsApp',
    startDate: '18 May 2024',
    endDate: '10 Jun 2024',
    status: 'Scheduled',
    performance: 0,
  },
  {
    id: 7,
    name: 'Anniversary Appreciation',
    segment: 'Premium Customers',
    channel: 'Email, Push Notification',
    startDate: '25 May 2024',
    endDate: '15 Jun 2024',
    status: 'Draft',
    performance: 0,
  },
]

export const OFFERS = [
  { name: '20% OFF Accessories', type: 'Offer', discount: '20%', segment: 'All Customers', validFrom: '01 May 2024', validUntil: '31 May 2024', status: 'Active' },
  { name: 'Free Shipping', type: 'Offer', discount: 'Free', segment: 'Loyal Customers', validFrom: '01 May 2024', validUntil: '30 Jun 2024', status: 'Active' },
  { name: 'Loyalty Bonus', type: 'Offer', discount: '500 pts', segment: 'Premium Customers', validFrom: '01 May 2024', validUntil: '31 May 2024', status: 'Active' },
  { name: 'Bank Offer', type: 'Offer', discount: '₹250 OFF', segment: 'All Customers', validFrom: '10 May 2024', validUntil: '25 May 2024', status: 'Completed' },
]

export const COUPONS = [
  { name: 'ACCESS20', type: 'Coupon', discount: '20%', segment: 'All Customers', validFrom: '01 May 2024', validUntil: '31 May 2024', status: 'Active' },
  { name: 'WELCOME10', type: 'Coupon', discount: '10%', segment: 'New Customers', validFrom: '01 May 2024', validUntil: '31 May 2024', status: 'Active' },
  { name: 'SAVE500', type: 'Coupon', discount: '₹500', segment: 'Price Sensitive', validFrom: '01 May 2024', validUntil: '15 Jun 2024', status: 'Active' },
]

export const LOYALTY = {
  stats: [
    { label: 'Total Loyalty Members', value: '6,480' },
    { label: 'Total Points Issued', value: '4,82,500' },
    { label: 'Points Redeemed', value: '1,94,300' },
    { label: 'Active Rewards', value: '12' },
  ],
  tiers: [
    { name: 'Silver', range: '0 - 999 points', color: 'from-slate-400 to-slate-300', perk: 'Basic rewards & birthday offer' },
    { name: 'Gold', range: '1,000 - 4,999 points', color: 'from-amber-400 to-yellow-300', perk: 'Free shipping + early sale access' },
    { name: 'Platinum', range: '5,000+ points', color: 'from-purple-500 to-violet-400', perk: 'Premium perks + dedicated support' },
  ],
  activity: [
    { member: 'Rahul Sharma', tier: 'Gold', pointsEarned: 1200, pointsRedeemed: 450, lastActivity: '28 May 2024' },
    { member: 'Priya Patel', tier: 'Platinum', pointsEarned: 5600, pointsRedeemed: 2100, lastActivity: '27 May 2024' },
    { member: 'Amit Verma', tier: 'Silver', pointsEarned: 340, pointsRedeemed: 100, lastActivity: '25 May 2024' },
    { member: 'Sneha Iyer', tier: 'Gold', pointsEarned: 1850, pointsRedeemed: 800, lastActivity: '22 May 2024' },
    { member: 'Karan Mehta', tier: 'Platinum', pointsEarned: 7300, pointsRedeemed: 2900, lastActivity: '20 May 2024' },
    { member: 'Divya Nair', tier: 'Silver', pointsEarned: 620, pointsRedeemed: 0, lastActivity: '18 May 2024' },
  ],
}

export const TARGETING_SEGMENTS = [
  { id: 1, name: 'Premium Customers', customers: 4359, avgSpending: '₹45,000', favouriteCategory: 'Electronics', frequency: 'High' },
  { id: 2, name: 'Loyal Customers', customers: 3114, avgSpending: '₹25,000', favouriteCategory: 'Fashion', frequency: 'High' },
  { id: 3, name: 'Price Sensitive', customers: 2491, avgSpending: '₹8,500', favouriteCategory: 'Home', frequency: 'Medium' },
  { id: 4, name: 'Inactive Customers', customers: 1245, avgSpending: '₹2,500', favouriteCategory: 'Grocery', frequency: 'Low' },
  { id: 5, name: 'New Customers', customers: 1247, avgSpending: '₹3,000', favouriteCategory: 'Beauty', frequency: 'Low' },
]

export const REPORTS = {
  revenueByCampaign: [
    { name: 'Summer Sale', revenue: 312000, conversion: 78 },
    { name: 'Electronics Fest', revenue: 265000, conversion: 65 },
    { name: 'Loyalty Week', revenue: 198000, conversion: 86 },
    { name: 'New User Offer', revenue: 142000, conversion: 72 },
    { name: 'Clearance Sale', revenue: 96000, conversion: 55 },
  ],
  segmentPerformance: [
    { name: 'Premium', value: 42 },
    { name: 'Loyal', value: 28 },
    { name: 'Price Sensitive', value: 17 },
    { name: 'New', value: 9 },
    { name: 'Inactive', value: 4 },
  ],
  offerPerformance: [
    { name: 'Accessories 20%', value: 58 },
    { name: 'Free Shipping', value: 47 },
    { name: 'Loyalty Bonus', value: 39 },
    { name: 'Bank Offer', value: 33 },
  ],
  cards: [
    { label: 'Sales Generated by Campaigns', value: '₹8,75,230' },
    { label: 'Campaign Conversion Rate', value: '6.8%' },
    { label: 'Offer Usage', value: '3,240' },
    { label: 'Coupon Usage', value: '4,870' },
    { label: 'Customer Engagement', value: '68.2%' },
  ],
}

export const MODELS = [
  { name: 'K-Means Clustering', status: 'Active', lastTrained: '30 May 2024', evaluation: '92.45%', clusters: 5, description: 'Partition-based clustering used for customer segmentation.' },
  { name: 'DBSCAN', status: 'Available', lastTrained: '—', evaluation: '—', clusters: '—', description: 'Density-based clustering for irregular segment shapes.' },
  { name: 'Hierarchical Clustering', status: 'Available', lastTrained: '—', evaluation: '—', clusters: '—', description: 'Tree-based clustering with interpretable dendrograms.' },
]

export const NOTIFICATIONS = [
  { title: 'Model training completed', time: '2 hours ago', unread: true },
  { title: 'New customer segment formed', time: '5 hours ago', unread: true },
  { title: 'Campaign Electronics Festival passed 65% performance', time: 'Yesterday', unread: true },
  { title: 'Dataset customer_behavior.csv is ready for analysis', time: '2 days ago', unread: false },
]

export const AI_ASSISTANT_MESSAGE =
  'AI is working to analyze customer behaviour and improve results.'

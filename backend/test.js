const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('Testing connection to Atlas...');
  
  try {
    // Try SRV first
    await mongoose.connect('mongodb+srv://zaid:zaid123@cluster0.gnxknpu.mongodb.net/');
    console.log('✅ SRV connection successful!');
    await mongoose.disconnect();
  } catch (srvError) {
    console.log('SRV connection failed:', srvError.message);
    
    // Ask for the correct replica set name
    console.log('\n⚠️  You need to get your replica set name from Atlas');
    console.log('Go to: Atlas Cluster → Connect → Connect your application');
    console.log('Look for: replicaSet=atlas-XXXXXXXXXX-shard-0');
  }
};

testConnection();
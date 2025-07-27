const axios = require('axios');

const api = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer a03fbb5f330771864a1ecdb4a055e947a7cb8e3e8903b32ad3ea507c4c8ac4eeb8715f40e5e6892644e950bda8b7324576d5fadef587aa4e9b652f7b464cd0cdd777a84c83984e82e288eed1b52ef795b978a465b94a4eb78a59eb3a9a49085d4b0a58dbe25d94321978fd03243f3bb4998f1dda74abedde3645b6e2ab761105`
  },
});

async function testAPI() {
  try {
    console.log('Testing API connection...');

    // Test functions-senai endpoint
    const functionsResponse = await api.get('/functions-senai?populate=*');
    console.log('Functions response:', functionsResponse.data);

    // Test capabilities-saep endpoint
    const capabilitiesSaepResponse = await api.get('/capabilities-saep?populate=*');
    console.log('Capabilities SAEP response:', capabilitiesSaepResponse.data);

    // Test capability endpoint
    const capabilityResponse = await api.get('/capability?populate=*');
    console.log('Capability response:', capabilityResponse.data);

    // Test knowledge endpoint
    const knowledgeResponse = await api.get('/knowledge?populate=*');
    console.log('Knowledge response:', knowledgeResponse.data);

  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
  }
}

testAPI(); 
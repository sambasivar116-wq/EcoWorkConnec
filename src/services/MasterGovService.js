import axios from 'axios';

// Official Government API Endpoints based on your list
const ENDPOINTS = {
  SOLAR: 'https://api.solarrooftop.gov.in/api/vendors', // MNRE 
  ENERGY: 'https://beeindia.gov.in/api/auditors', // BEE 
  EWASTE: 'https://eprewaste.cpcb.gov.in/api/recyclers', // CPCB 
  GREYWATER: 'https://ejalshakti.gov.in/api/jjm/experts', 
  BIOGAS: 'https://biourja.mnre.gov.in/api/experts',
  RAINWATER: 'https://cgwa-noc.gov.in/api/consultants',
  COMPOST: 'https://sbm.gov.in/api/service-providers',
  GARDENING: 'https://vijayawada.ap.gov.in/api/vendors', // Local ULB 
  RECYCLING: 'https://eprplastic.cpcb.gov.in/api/processors',
  EV_CHARGING: 'https://evyatra.beeindia.gov.in/api/stations'
};

export const fetchAllGovServices = async (location = "Vijayawada") => {
  const serviceKeys = Object.keys(ENDPOINTS);
  
  try {
    // Parallel ga anni APIs ni call chesthunnam (Time save avthundi)
    const responses = await Promise.allSettled(
      serviceKeys.map(key => 
        axios.get(`${ENDPOINTS[key]}?city=${location}`, { timeout: 5000 })
      )
    );

    // Data ni consolidate chesthunnam
    const masterData = {};
    responses.forEach((res, index) => {
      const serviceName = serviceKeys[index];
      if (res.status === 'fulfilled') {
        masterData[serviceName] = res.value.data;
      } else {
        console.warn(`${serviceName} sync failed:`, res.reason.message);
        masterData[serviceName] = []; // Fail ayithe empty list
      }
    });

    return masterData;
  } catch (error) {
    console.error("Master Sync Error:", error);
    return null;
  }
};
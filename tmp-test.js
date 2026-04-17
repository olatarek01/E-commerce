const axios = require('axios');
(async () => {
  try {
    const r = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log('status', r.status, 'data', r.data);
  } catch (e) {
    if (e.response) console.log('status', e.response.status, 'data', e.response.data);
    else console.log('err', e.message);
  }
})();

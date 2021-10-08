
class Http {
  static instance = new Http();

  get = async (url) => {
    try{
      const request = await fetch(url);
      const json = await request.json();
      return json;

    } catch (e) {
      console.error('Http ERROR: GET ', e)
    }
  };

  post = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'POST',
        body,
      });
      const json = await request.json();
      return json;

    } catch (e) {
      console.error('Http ERROR: POST ', e)
    }
  };
}

export default Http;

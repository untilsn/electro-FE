export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "en";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: import.meta.env.VITE_REACT_APP_FB_ID, // You App ID
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: "v8.6", // use version 2.1
    });
  };

  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

//conver to vnd
export function formatPrice(number) {
  if (typeof number !== "number") return number;

  return number.toLocaleString("vi-VN"); // Định dạng theo kiểu của Việt Nam
}

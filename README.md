SAMPLE CODE FROM JSS REACT APP

Some note on this code snippet:
** Description: this project is a SSR react app that is consummed by a CMS system **
*Note: this is not a complete app but rather code snippet to show case some functionality.

1. the entry of the app is at index.js
2. the functionality to focus on is the cookiePortProvider
3. by wrapping the app with CookiePortProvider, in which I used useContext to create a hook that allow me to read and set the cookie from any components
4. in this case the important cookie is the access_token, which came from an authorization api
5. with this cookie I can securely call the API and get the information needed
6. since the token get expired, I developed the reup mechanism that let the app renew access token using the /reup endpoint
7. every components are accompanied by the unit test
8. from the Approot in Index, there is a routehandler that leverage 'sitecore-jss-react' that provide the context that needed to ETFTemplate
9. from there you can see the normal implementation of an react app of and implementation.

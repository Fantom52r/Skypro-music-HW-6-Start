import ReduxProviderWrapper from "../store/ReduxProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProviderWrapper>
      <Component {...pageProps} />
    </ReduxProviderWrapper>
  );
}

export default MyApp;
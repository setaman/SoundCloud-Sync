<template>
  <div>
    <webview id="webview" src="https://soundcloud.com/you/likes" style="display:inline-flex; width:100%; height:700px">
      <h1>
        hello in webview
      </h1>
    </webview>
    <webview id="webview2" src="https://soundcloud.com/" style="display:inline-flex; width:100%; height:500px">
      <h1>
        hello in webview
      </h1>
    </webview>
    <h1>
      hello
    </h1>
  </div>
</template>

<script>
export default {
  name: 'WebViewTest',
  mounted () {
    const webview = document.querySelector('webview');

    const loadstart = () => {
      console.log('LOADING START...');
    };

    const loadstop = () => {
      console.log('LOADING Stop');
      /* webview.executeJavaScript('console.log("CODE INSIDE")');
      webview.openDevTools(); */
    };

    webview.addEventListener('did-start-loading', loadstart);
    webview.addEventListener('did-stop-loading', loadstop);
  }
};
</script>

<style scoped>

</style>

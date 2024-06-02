<template>
  <div id="container" class="map">
  </div>
  <div class="input-card">
    <h4>左击获取经纬度：</h4>
    <div class="input-item">
      <input type="text" readonly="true" id="lnglat">
    </div>
  </div>
</template>

<style scoped>
.map{
  background-color: white;
  border: #b3d1c8;
  height: 500px;
}
</style>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const emits = defineEmits(['coordinates-selected']);

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: '6dcf279b3051f93ca87a74cf70cca816',
  };

  initMap();
});
/**
 * AI-generated-content
 * tool: ChatGPT
 * version: latest
 * usage: I've used it to convert the example in AMap docs in js to Vue
 */
function initMap() {
  const script = document.createElement('script');

  script.src =
      'https://webapi.amap.com/maps?v=2.0&key=20db94d3028c1d2472ae4f29ab518e4b&plugin=AMap.Autocomplete';
  script.async = true;

  script.onload = () => {
    console.log('Map loaded');
    const map = new AMap.Map('container', {
      zoom: 17,
      zooms: [2, 20],
      center: [113.99913918407441, 22.60212445711336],
    });

    var marker = new AMap.Marker({
      position: [113.99913918407441, 22.60212445711336],
      icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      anchor:'bottom-center',
      offset: new AMap.Pixel(0, 0)
    });
    marker.setMap(map);

    map.on('click', function (e) {
      const lng = e.lnglat.getLng();
      const lat = e.lnglat.getLat();
      document.getElementById('lnglat').value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
      emits('coordinates-selected', { lng, lat });
      console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat());
      marker.position = [lng, lat]
      marker.setMap(null);

      marker = new AMap.Marker({
        position: [lng, lat],
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        anchor:'bottom-center',
        offset: new AMap.Pixel(0, 0)
      });
      marker.setMap(map);
    });
  };

  document.head.appendChild(script);
}
</script>

<template>
  <div>
    <p>
    {{ signedUrl }}
    </p>
  </div>
</template>

<script>
import jsSHA from 'jssha';

export default {
  data() {
    return {
      key: 'rH8zv6HxEStNgDj5PX5zDkBTDc9AVj1e6iNqTXPvI0gzHW7SaVZnUg1XP4xv63j9',
      url: '/secourse-secourse-us/items/4f168c9e-d055-439e-8a63-a14d07742a9d',
      originalurl: 'https://rapi-us-west.recombee.com:443/secourse-secourse-us/items/4f168c9e-d055-439e-8a63-a14d07742a9d',
      signedUrl: ''
    };
  },
  mounted() {
    // rapi-ap-se.recombee.com - server side (use private key MiWnAgFisnr8dRFXyPsBm9cOev5ZvgGUUB9CmpLtOrhQbhMrdJzl9gIMTbezkIw9)
    // client-rapi-ap-se.recombee.com - client side (use public key gmCdzTsXVlm57eV1IRd48h6rb0urhVT62yauwWQ65n7qcwx5ZaWcFoUbaK5K7LKC)


    // Append frontend_timestamp to the URL
    const time = (this.url.indexOf('?') === -1 ? '?' : '&') +
        'hmac_timestamp=' +
        parseInt(new Date().getTime() / 1000);
    this.url += time
    console.log("Mid way ", this.url)

    // Generate HMAC signature
    const shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.setHMACKey(this.key, 'TEXT');
    shaObj.update(this.url);
    const signature = shaObj.getHMAC('HEX');

    console.log("After processing ", this.url)


    // Append frontend_sign to the URL
    this.signedUrl = this.originalurl + time +'&hmac_sign=' + signature;
    console.log("Signed url ", this.signedUrl)
  }
};
</script>

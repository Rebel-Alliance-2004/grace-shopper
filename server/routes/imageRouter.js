const { Router } = require('express');
const AWS = require('aws-sdk');

const imageRouter = Router()

imageRouter.get('/', (req, res) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  const s3 = new AWS.S3();
  async function getImage() {
    const data = s3.getObject(
      {
        Bucket: 'rebel-alliance-graces-hopper',
        Key: 'Yamaha_Flugelhorn_YFH-8310Z.jpg'
      }

    ).promise();
    return data;
  }
  function encode(data) {
    const buf = Buffer.from(data);
    const base64 = buf.toString('base64');
    return base64
  }
  getImage()
    .then((img) => {
      const image = `<img src='data:image/jpeg;base64,${encode(img.Body)}'/>`;
      res.send(image)
    }).catch((e) => {
      res.send(e)
    })

})

module.exports = {
  url: '/image',
  router: imageRouter
}
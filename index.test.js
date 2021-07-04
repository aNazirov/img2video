const request = require('supertest');
const path = require('path')
const app = require('./app');

describe('POST /api/upload - image to video converter', () => {
    const filePath = path.join(__dirname, '/uploads/test')
    it('should upload images and convert to video',  (done) => {
        request(app)
            .post('/api/upload')
            .attach('images', `${filePath}/image1.jpg`)
            .attach('images', `${filePath}/image2.jpg`)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toEqual({videoUrl: 'video/slideshow.mp4'})
                return done()
            });
    });
})
import Image from 'next/image'
// Todo: 後日ファイルパスなどをリファクタリング予定
//　Todo: Sassも使えるが、tailwindにも興味はある
import classes from 'styles/components/homepage/Hero.module.css'

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/images/site/avator.jpeg'}
          alt={'An Image Showing Yutaka'}
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, Im Yutaka</h1>
      <p>I blog about web development - especially frontend frameworks likes React.</p>
    </section>
  )
}

export default Hero

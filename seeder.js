import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/productModel.js'
import connectDB from './database.js'
import axios from 'axios'
import convert from 'xml-js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    let products = []
    const res = await axios.get(
      'https://www.b2bmarkt.gr/feeds?key=21100QCXPGbiX9xJxfORExLbBCpUzBQ4hpFvGwpnf&act=1001&lang=1'
    )

    const xmlData = convert.xml2js(res.data, {
      compact: true,
      spaces: 4,
    })

    const data = xmlData.Products.Product

    data.forEach((p) => {
      if (
        p.AvailabilityTypeName._text === 'Διαθέσιμο' &&
        p.Name._cdata &&
        p.ItemCode._cdata &&
        p.ExtendedDescription._cdata &&
        p.MarketPrice._text
      ) {
        let product = {
          name: p.Name?._cdata,
          sku: p.ItemCode?._cdata,
          image: p.ImagesLocation.image[0]?._cdata,
          category: p.Categories.Category[p.Categories.Category.length - 1]?._attributes.id || '0',
          brand: 'HomeMarkt',
          description: p.ExtendedDescription?._cdata,
          price: p.MarketPrice?._text,
          //   discountPrice: p.price_ind_special._text,
          availability: p.AvailabilityTypeName?._text,
          countInStock: p.Stock?._text,
        }
        products.push(product)
      }
    })

    await Product.insertMany(products)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

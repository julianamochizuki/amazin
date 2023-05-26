module.exports = [
  {
    name: 'Electronics',
    categories: [
      {
        name: 'Smartphones',
        products: [
          {
            name: 'iPhone 12 Pro Max',
            price_cents: 109900,
            description:
              "The iPhone 12 Pro Max features Apple's A14 Bionic chip, a 6.7-inch Super Retina XDR display, and a pro camera system that takes low-light photography to the next level.",
            image:
              'https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aVBob25lJTIwMTIlMjBQcm8lMjBNYXh8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 100,
            categoryId: 4,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Samsung Galaxy S21 Ultra',
            price_cents: 119999,
            description:
              'The Samsung Galaxy S21 Ultra features a 6.8-inch Dynamic AMOLED 2X display, a 108MP pro-grade camera system, and 5G connectivity.',
            image:
              'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8U2Ftc3VuZyUyMEdhbGF4eXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 50,
            categoryId: 4,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Google Pixel 5',
            price_cents: 69999,
            description:
              'The Google Pixel 5 features a 6-inch OLED display, a dual-pixel 12.2MP camera, and 5G connectivity.',
            image:
              'https://images.unsplash.com/photo-1596742578443-7682ef5251cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fEdvb2dsZSUyMFBpeGVsJTIwNXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 75,
            categoryId: 4,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'OnePlus 9 Pro',
            price_cents: 106999,
            description:
              'The OnePlus 9 Pro features a 6.7-inch Fluid AMOLED display, a Hasselblad quad camera system, and Warp Charge 65T fast charging.',
            image:
              'https://images.unsplash.com/photo-1658321466969-1c45400bb947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8T25lUGx1cyUyMDklMjBQcm98ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 60,
            categoryId: 4,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Sony Xperia 1 III',
            price_cents: 129999,
            description:
              'The Sony Xperia 1 III features a 6.5-inch 4K HDR OLED display, a triple-lens camera system with ZEISS optics, and 5G connectivity.',
            image:
              'https://images.unsplash.com/photo-1657732214333-697a115ba263?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8U29ueSUyMFhwZXJpYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 40,
            categoryId: 4,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Laptops',
        products: [
          {
            name: 'Apple MacBook Pro 16-inch',
            price_cents: 239900,
            description:
              "The MacBook Pro 16-inch features Apple's M1 Pro or M1 Max chip, a 16-inch Retina display, and up to 10 hours of battery life.",
            image:
              'https://images.unsplash.com/photo-1519633415955-d0f6d7295f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBNYWNCb29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 50,
            categoryId: 3,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Dell XPS 13',
            price_cents: 139999,
            description:
              'The Dell XPS 13 features an 11th Gen Intel Core processor, a 13.4-inch Full HD+ display, and up to 16 hours of battery life.',
            image:
              'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8RGVsbCUyMFhQU3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 75,
            categoryId: 3,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Apple MacBook Air',
            price_cents: 99900,
            description:
              'Thin and light laptop with powerful performance and long battery life',
            image:
              'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8QXBwbGUlMjBNYWNCb29rJTIwQWlyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 5,
            categoryId: 3,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Lenovo ThinkPad X1 Carbon',
            price_cents: 139900,
            description:
              'Durable and reliable business laptop with fast performance',
            image:
              'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8TGVub3ZvJTIwVGhpbmtQYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 7,
            categoryId: 3,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'HP Spectre x360',
            price_cents: 119900,
            description:
              'Versatile 2-in-1 laptop with a stylish design and long battery life',
            image:
              'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8SFAlMjBTcGVjdHJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 3,
            categoryId: 3,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Asus ZenBook Pro Duo',
            price_cents: 249900,
            description:
              'Powerful and innovative laptop with dual screens for enhanced productivity',
            image:
              'https://images.unsplash.com/photo-1636211989567-fd3ada526ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8QXN1cyUyMFplbkJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 2,
            categoryId: 3,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'TVs',
        products: [
          {
            name: 'LG C1 OLED',
            price_cents: 249900,
            description:
              'The LG C1 OLED features a 4K OLED display, Dolby Vision IQ, and Dolby Atmos.',
            image:
              'https://images.unsplash.com/flagged/photo-1572609239482-d3a83f976aa0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8TEclMjB0dnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 2,
            categoryId: 1,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Samsung 65-inch QLED Q70T Series 4K UHD Dual LED Quantum HDR Smart TV with Alexa Built-in',
            price_cents: 129900,
            description:
              'Experience vivid color and detail with this Samsung 65-inch QLED Q70T Series 4K UHD Dual LED Quantum HDR Smart TV. The Quantum HDR produces fine detail with rich colors and a realistic look, while the intelligent Quantum Processor 4K upscales content for sharp detail and refined color.',
            image:
              'https://media.istockphoto.com/id/1338863489/photo/man-watching-tv-remote-control-in-hand.jpg?b=1&s=170667a&w=0&k=20&c=EI_QnQc_ttQtwrOjmn-832-7EA2c8L7fwhpBY_fSsXQ=',
            quantity: 100,
            categoryId: 1,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'LG OLED65CXPUA Alexa Built-In CX 65-inch 4K Smart OLED TV',
            price_cents: 219996,
            description:
              'This LG CX Series OLED TV features self-lit pixels that turn on and off individually, creating perfect black and infinite contrast. It has an α9 Gen 3 AI Processor 4K that analyzes content to deliver refined and detailed picture quality. It also features Alexa Built-In for easy voice control of your TV and smart home devices.',
            image:
              'https://media.istockphoto.com/id/1448361676/photo/remote-control-of-television.jpg?b=1&s=170667a&w=0&k=20&c=1jNHW6oXr6umUYXz0D3OOBK5aUUnYZ00k87Zooct1JA=',
            quantity: 75,
            categoryId: 1,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Sony X900H 65-inch TV: 4K Ultra HD Smart LED TV with HDR, Game Mode for Gaming, and Alexa Compatibility',
            price_cents: 119998,
            description:
              'Experience breathtaking 4K Ultra HD picture quality with this Sony X900H 65-inch TV. It features advanced voice control through Alexa compatibility and hands-free help from Google Assistant. The TV is also optimized for gaming with HDMI 2.1 and Game Mode for smoother gameplay with reduced input lag and high frame rate support.',
            image:
              'https://media.istockphoto.com/id/1354701109/photo/tv-mockup-in-the-dark-living-room-at-night-3d-illustration-tv-screen-tv-cabinet-plant.jpg?b=1&s=170667a&w=0&k=20&c=c068DvJwOYV9DVCVX45ewonva7AKWuE6FMgEbsnHvM4=',
            quantity: 50,
            categoryId: 1,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'TCL 55-inch 6-Series 4K UHD QLED Dolby Vision HDR Roku Smart TV',
            price_cents: 59999,
            description:
              'Enjoy a stunning picture quality with this TCL 55-inch 6-Series 4K UHD QLED Dolby Vision HDR Roku Smart TV. It features Quantum Dot technology that delivers brilliant picture quality and life-like color. The built-in Roku TV platform provides easy access to thousands of streaming channels, cable TV, and gaming consoles.',
            image:
              'https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVsZXZpc2lvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 150,
            categoryId: 1,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Cameras',
        products: [
          {
            name: 'Canon EOS Rebel T7 DSLR Camera',
            price_cents: 64999,
            description:
              'The Canon EOS Rebel T7 is a great entry-level DSLR camera that produces high-quality photos and videos.',
            image:
              'https://images.unsplash.com/photo-1533246860975-b290a87773d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Q2Fub24lMjBFT1N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 7,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Sony Alpha a6400 Mirrorless Camera',
            price_cents: 89999,
            description:
              'The Sony Alpha a6400 is a versatile and compact mirrorless camera that delivers stunning image quality.',
            image:
              'https://images.unsplash.com/photo-1579642983329-9ae942874d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8U29ueSUyMEFscGhhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 7,
            categoryId: 7,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Nikon COOLPIX B600 Digital Camera',
            price_cents: 32999,
            description:
              'The Nikon COOLPIX B600 is a powerful and easy-to-use digital camera that is perfect for beginners and enthusiasts alike.',
            image:
              'https://images.unsplash.com/photo-1551828046-f79b15499328?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmlrb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 7,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Fujifilm X-T4 Mirrorless Camera',
            price_cents: 169999,
            description:
              'The Fujifilm X-T4 is a professional-level mirrorless camera that offers advanced features and exceptional image quality.',
            image:
              'https://images.unsplash.com/photo-1566863244489-a5e7946f46f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8RnVqaWZpbG18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 3,
            categoryId: 7,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Panasonic Lumix GH5 Mirrorless Camera',
            price_cents: 149999,
            description:
              'The Panasonic Lumix GH5 is a top-of-the-line mirrorless camera that is perfect for professional videographers and photographers.',
            image:
              'https://images.unsplash.com/photo-1590292339438-5fc3be7fca9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8UGFuYXNvbmljJTIwY2FtZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 5,
            categoryId: 7,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
    ],
  },

  {
    name: 'Home & Kitchen',
    categories: [
      {
        name: 'Appliances',
        products: [
          {
            name: 'Samsung French Door Refrigerator',
            price_cents: 259999,
            description:
              "This Samsung refrigerator is designed to keep your food fresher for longer. With its French door design, it's easy to access everything you need.",
            image:
              'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fFJlZnJpZ2VyYXRvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 5,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Dyson V11 Absolute Cordless Vacuum',
            price_cents: 59999,
            description:
              'This Dyson vacuum is cordless and lightweight, making it easy to clean your home without any hassle.',
            image:
              'https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmFjY3VtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 5,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'KitchenAid Stand Mixer',
            price_cents: 34999,
            description:
              'The KitchenAid Stand Mixer is a must-have for any home baker. With multiple attachments, you can make everything from bread to ice cream.',
            image:
              'https://images.unsplash.com/photo-1595026081325-4993979442d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8S2l0Y2hlbkFpZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 12,
            categoryId: 5,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Nespresso Vertuo Coffee Maker',
            price_cents: 12999,
            description:
              'This Nespresso coffee maker makes delicious coffee with just the touch of a button. Its sleek design looks great on any kitchen counter.',
            image:
              'https://images.unsplash.com/photo-1585858953334-76b72825fb13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fE5lc3ByZXNzb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 20,
            categoryId: 5,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Furniture',
        products: [
          {
            name: 'West Elm Sofa',
            price_cents: 129999,
            description:
              "This West Elm sofa is comfortable, stylish, and perfect for any living room. It's available in a variety of colors to suit your decor.",
            image:
              'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 3,
            categoryId: 14,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Billy Bookcase',
            price_cents: 7999,
            description:
              "The Billy Bookcase is a classic that never goes out of style. With adjustable shelves, it's perfect for storing books, knick-knacks, and more.",
            image:
              'https://images.unsplash.com/photo-1602990721338-9cbb5b983c4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Qm9va2Nhc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 14,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Pottery Barn Dining Table',
            price_cents: 149999,
            description:
              "This Pottery Barn dining table is the perfect addition to any home. It's made of solid wood and has a beautiful finish that will last for years.",
            image:
              'https://images.unsplash.com/photo-1617850687361-a07b256ff259?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8RGluaW5nJTIwVGFibGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 5,
            categoryId: 14,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Crate & Barrel Bed Frame',
            price_cents: 99999,
            description:
              "This Crate & Barrel bed frame is the perfect addition to any bedroom. It's made of solid wood and has a beautiful finish that will last for years.",
            image:
              'https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fEJlZCUyMEZyYW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 7,
            categoryId: 14,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'CB2 Coffee Table',
            price_cents: 39999,
            description:
              "This CB2 coffee table is the perfect addition to any living room. It's made of solid wood and has a beautiful finish that will last for years.",
            image:
              'https://images.unsplash.com/photo-1619911013257-8f1fbc919fc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwVGFibGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 8,
            categoryId: 14,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Storage & Organization',
        products: [
          {
            name: 'The Container Store Shoe Rack',
            price_cents: 3999,
            description:
              "This shoe rack is the perfect way to keep your shoes organized and off the floor. It's made of durable metal and has a sleek design that will look great in any room.",
            image:
              'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8U2hvZSUyMFJhY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 8,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Storage Bins',
            price_cents: 999,
            description:
              "These storage bins are perfect for organizing your home. They're made of durable plastic and come in a variety of colors to match any decor.",
            image:
              'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ymluc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 20,
            categoryId: 8,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Closet Organizer',
            price_cents: 4999,
            description:
              "This closet organizer is the perfect way to keep your clothes organized and off the floor. It's made of durable metal and has a sleek design that will look great in any room.",
            image:
              'https://images.unsplash.com/photo-1530411554903-7e745b9f1f6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fENsb3NldCUyME9yZ2FuaXplciUyMnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 5,
            categoryId: 8,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Kitchen Cart',
            price_cents: 2999,
            description:
              'This storage cart is the perfect way to keep your home organized.',
            image:
              'https://images.unsplash.com/photo-1520981825232-ece5fae45120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fFN0b3JhZ2UlMjB1dGVuc2lsc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 8,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Shoe Rack',
            price_cents: 1999,
            description:
              "This shoe rack is the perfect way to keep your shoes organized and off the floor. It's made of durable metal and has a sleek design that will look great in any room.",
            image:
              'https://images.unsplash.com/photo-1595593795628-5e32198b3ee4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZSUyMHJhY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 8,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Home Decor',
        products: [
          {
            name: 'Wall Art',
            price_cents: 2999,
            description:
              "This wall art is the perfect way to add some color and personality to your home. It's made of durable metal and has a sleek design that will look great in any room.",
            image: 'https://example.com/wall-art.jpg',
            quantity: 10,
            categoryId: 6,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Throw Pillows',
            price_cents: 1999,
            description:
              "These throw pillows are the perfect way to add some color and personality to your home. They're made of durable fabric and have a sleek design that will look great in any room.",
            image:
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 6,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Candles',
            price_cents: 999,
            description:
              "These candles are the perfect way to add some color and personality to your home. They're made of durable wax and have a sleek design that will look great in any room.",
            image:
              'https://images.unsplash.com/photo-1588372405219-e40d64efafcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbmRsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 6,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Picture Frames',
            price_cents: 999,
            description:
              "These picture frames are the perfect way to add some color and personality to your home. They're made of durable wood and have a sleek design that will look great in any room.",
            image:
              'https://images.unsplash.com/photo-1551373884-8a0750074df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8UGljdHVyZSUyMEZyYW1lc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 6,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
    ],
  },

  // {
  //   name: 'Sports & Outdoors',
  //   categories: [
  //     { name: 'Exercise & Fitness' },
  //     { name: 'Hunting & Fishing' },
  //     { name: 'Cycling' },
  //     { name: 'Camping & Hiking' },
  //   ],
  // },

  {
    name: 'Healthy & Beauty',
    categories: [
      {
        name: 'Skincare',
        products: [
          {
            name: 'Cleanser',
            price_cents: 1999,
            description:
              "This cleanser is the perfect way to keep your skin clean and healthy. It's made of natural ingredients and has a gentle formula that won't dry out your skin.",
            image:
              'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Q2xlYW5zZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 11,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Moisturizer',
            price_cents: 1999,
            description:
              "This moisturizer is the perfect way to keep your skin hydrated and healthy. It's made of natural ingredients and has a gentle formula that won't clog pores.",
            image:
              'https://images.unsplash.com/photo-1629732097571-b042b35aa3ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8TW9pc3R1cml6ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 11,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Face Mask',
            price_cents: 999,
            description:
              "This face mask is the perfect way to keep your skin clean and healthy. It's made of natural ingredients and has a gentle formula that won't dry out your skin.",
            image:
              'https://images.unsplash.com/photo-1552046122-03184de85e08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNraW4lMjBNYXNrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 11,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Face Oil',
            price_cents: 1999,
            description:
              "This face oil is the perfect way to keep your skin hydrated and healthy. It's made of natural ingredients and has a gentle formula that won't clog pores.",
            image:
              'https://images.unsplash.com/photo-1629732097617-decfc7005566?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmFjZSUyMG9pbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 11,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Face Roller',
            price_cents: 999,
            description:
              "This face roller is the perfect way to keep your skin clean and healthy. It's made of natural ingredients and has a gentle formula that won't dry out your skin.",
            image:
              'https://images.unsplash.com/photo-1600428853876-fb5a850b444f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8RmFjZSUyMFJvbGxlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 11,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Makeup',
        products: [
          {
            name: 'Mascara',
            price_cents: 1999,
            description:
              "This mascara is the perfect way to keep your lashes looking long and full. It's made of natural ingredients and has a gentle formula that won't clump or flake.",
            image: 'https://example.com/mascara.jpg',
            quantity: 10,
            categoryId: 10,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Eyeliner',
            price_cents: 999,
            description:
              "This eyeliner is the perfect way to keep your eyes looking bright and beautiful. It's made of natural ingredients and has a gentle formula that won't smudge or fade.",
            image:
              'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFzY2FyYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 10,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Lipstick',
            price_cents: 1999,
            description:
              "This lipstick is the perfect way to keep your lips looking bright and beautiful. It's made of natural ingredients and has a gentle formula that won't smudge or fade.",
            image:
              'https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8TGlwc3RpY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 10,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Lip Gloss',
            price_cents: 999,
            description:
              "This lip gloss is the perfect way to keep your lips looking bright and beautiful. It's made of natural ingredients and has a gentle formula that won't smudge or fade.",
            image:
              'https://images.unsplash.com/photo-1631214499887-88e7084d7f64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8TGlwJTIwR2xvc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 10,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Blush',
            price_cents: 1999,
            description:
              "This blush is the perfect way to keep your cheeks looking bright and beautiful. It's made of natural ingredients and has a gentle formula that won't smudge or fade.",
            image:
              'https://images.unsplash.com/photo-1503236823255-94609f598e71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Qmx1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 10,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Haircare',
        products: [
          {
            name: 'Shampoo',
            price_cents: 1999,
            description:
              "This shampoo is the perfect way to keep your hair looking healthy and shiny. It's made of natural ingredients and has a gentle formula that won't dry out your hair.",
            image:
              'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmFtZSUzQSUyMCUyMlNoYW1wb28lMjIlMkN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 9,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Conditioner',
            price_cents: 1999,
            description:
              "This conditioner is the perfect way to keep your hair looking healthy and shiny. It's made of natural ingredients and has a gentle formula that won't dry out your hair.",
            image:
              'https://images.unsplash.com/photo-1630082900894-edbd503588f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fENvbmRpdGlvbmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 10,
            categoryId: 9,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Moroccan Oil Treatment',
            price_cents: 2999,
            description:
              'This luxurious hair treatment is infused with argan oil and will leave your hair feeling silky smooth and nourished.',
            image:
              'https://images.unsplash.com/photo-1643123158622-cd757dce7cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fE9pbCUyMGhhaXIlMjJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 8,
            categoryId: 9,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Hair Dryer',
            price_cents: 4999,
            description:
              'This powerful hair dryer has multiple heat and speed settings, and comes with a diffuser attachment for curly hair.',
            image:
              'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8SGFpciUyMERyeWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 3,
            categoryId: 9,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Personal Care',
        products: [
          {
            name: 'Sonic Electric Toothbrush',
            price_cents: 4999,
            description:
              "Get the ultimate clean with our Sonic Electric Toothbrush. With 5 different brushing modes and a powerful motor, your teeth will feel like they've just been to the dentist.",
            image:
              'https://images.unsplash.com/photo-1559671216-bda69517c47f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8RWxlY3RyaWMlMjBUb290aGJydXNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 15,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Rechargeable Hair Clipper',
            price_cents: 3499,
            description:
              "Our Rechargeable Hair Clipper is perfect for at-home haircuts. With multiple guide combs and a powerful motor, you'll get a professional-looking cut every time.",
            image:
              'https://images.unsplash.com/photo-1621605810052-80936545a850?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8SGFpciUyMENsaXBwZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 8,
            categoryId: 15,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Facial Cleansing Brush',
            price_cents: 2999,
            description:
              'Get glowing skin with our Facial Cleansing Brush. With gentle bristles and a rotating head, it removes dirt and makeup for a deep clean.',
            image:
              'https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8RmFjaWFsJTIwQ2xlYW5zaW5nJTIwQnJ1c2h8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 20,
            categoryId: 15,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Foot Spa',
            price_cents: 6999,
            description:
              'Treat yourself to a relaxing foot spa with our all-in-one unit. With heat, vibration, and bubbles, it soothes tired feet and leaves them feeling soft and refreshed.',
            image:
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fEZvb3QlMjBTcGF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 5,
            categoryId: 15,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
    ],
  },

  {
    name: 'Books',
    categories: [
      {
        name: 'Fiction',
        products: [
          {
            name: 'Eat, Pray, Love',
            price_cents: 1299,
            description:
              'A memoir by Elizabeth Gilbert about her journey to find herself after a difficult divorce. The book chronicles her travels to Italy, India, and Indonesia.',
            image:
              'https://images.unsplash.com/photo-1663868749654-c467d3364884?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fFRoZSUyME5pZ2h0aW5nYWxlJTNBJTIwQSUyME5vdmVsJTIyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 13,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Milk and Honey',
            price_cents: 899,
            description:
              'A collection of poetry and prose about survival. The book is divided into four chapters, and each chapter serves a different purpose.',
            image:
              'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 20,
            categoryId: 13,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'The Great Gatsby',
            price_cents: 799,
            description:
              'A classic novel by F. Scott Fitzgerald set in the Roaring Twenties. The story follows a millionaire named Jay Gatsby and his love for Daisy Buchanan.',
            image:
              'https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 25,
            categoryId: 13,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'To Kill a Mockingbird',
            price_cents: 899,
            description:
              'A novel by Harper Lee set in the Deep South during the Great Depression. The story follows a young girl named Scout and her experiences with racism and injustice.',
            image:
              'https://images.unsplash.com/photo-1672317535351-54ed5ebf791d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8VG8lMjBLaWxsJTIwYSUyME1vY2tpbmdiaXJkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 30,
            categoryId: 13,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Pride and Prejudice',
            price_cents: 799,
            description:
              'A classic novel by Jane Austen set in early 19th century England. The story follows Elizabeth Bennet and her romantic relationship with Mr. Darcy.',
            image:
              'https://images.unsplash.com/photo-1573125716783-d05b57a86488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8UHJpZGUlMjBhbmQlMjBQcmVqdWRpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 35,
            categoryId: 13,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Non-fiction',
        products: [
          {
            name: 'The Power of Habit: Why We Do What We Do in Life and Business',
            price_cents: 899,
            description:
              'In The Power of Habit, award-winning New York Times business reporter Charles Duhigg takes us to the thrilling edge of scientific discoveries that explain why habits exist and how they can be changed. With penetrating intelligence and an ability to distill vast amounts of information into engrossing narratives, Duhigg brings to life a whole new understanding of human nature and its potential for transformation.',
            image:
              'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 20,
            categoryId: 12,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Sapiens: A Brief History of Humankind',
            price_cents: 799,
            description:
              'Sapiens tackles the biggest questions of history and of the modern world, and it is written in unforgettably vivid language. You will love it!',
            image:
              'ghttps://images.unsplash.com/photo-1605732021795-68ea025c3d37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9vayUyMHNhcGllbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 12,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change',
            price_cents: 1199,
            description:
              'The 7 Habits of Highly Effective People has captivated readers for 25 years. It has transformed the lives of Presidents and CEOs, educators and parents—in short, millions of people of all ages and occupations.',
            image:
              'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 12,
            categoryId: 12,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
            price_cents: 1099,
            description:
              'Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones. James Clear draws on ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making small changes that lead to big results.',
            image:
              'https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMEF0b21pYyUyMEhhYml0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 8,
            categoryId: 12,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Thinking, Fast and Slow',
            price_cents: 1299,
            description:
              'Thinking, Fast and Slow provides a groundbreaking new approach to understanding the mind and human behavior. Drawing on decades of research in psychology and behavioral economics, Kahneman has written an engaging and thought-provoking book that will inspire readers to think differently about their own minds and the world around them.',
            image:
              'https://images.unsplash.com/photo-1556695725-3cc4a29d4ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9vayUyMFRoaW5raW5nJTJDJTIwRmFzdCUyMGFuZCUyMFNsb3d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 7,
            categoryId: 12,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
      {
        name: 'Audible Books & Originals',
        products: [
          {
            name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
            price_cents: 1499,
            description:
              "Atomic Habits is the definitive guide to breaking bad habits and creating good ones. In this book, you'll learn how to build habits that last and how to make small changes that lead to big results.",
            image:
              'https://images.unsplash.com/photo-1514189620116-d213caf0d6d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Ym9vayUyMGF0b21pYyUyMGhhYml0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 20,
            categoryId: 2,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'The Four Agreements: A Practical Guide to Personal Freedom',
            price_cents: 999,
            description:
              "The Four Agreements is a powerful guide to personal freedom. In this book, you'll learn how to transform your life by adopting four simple agreements that will help you break free from self-limiting beliefs and negative thoughts.",
            image:
              'https://images.unsplash.com/photo-1508169351866-777fc0047ac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9vayUyMEZvdXIlMjBBZ3JlZW1lbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 15,
            categoryId: 2,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'Becoming',
            price_cents: 1599,
            description:
              'Becoming is the memoir of former First Lady Michelle Obama. In this book, she shares her personal journey from a working-class family in Chicago to the White House, offering an intimate look at her life and the challenges she faced along the way.',
            image:
              'https://images.unsplash.com/photo-1544650039-22886fbb4323?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWljaGVsbGUlMjBvYmFtYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            quantity: 25,
            categoryId: 2,
            isOnSale: true,
            discountPercent: 10,
            salesStartDate: new Date('2023-01-01 16:16:50 GMT-0400'),
            salesEndDate: new Date('2030-01-31 16:16:50 GMT-0400'),
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'A Book Full of Hope',
            price_cents: 1299,
            description:
              "A Book Full of Hope is a collection of poems that will inspire you to live your best life. In this book, you'll find poems about love, loss, and hope. You'll also find poems about the power of friendship and the importance of family.",
            image:
              'https://images.unsplash.com/photo-1577627444534-b38e16c9d796?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 18,
            categoryId: 2,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
          {
            name: 'The Power of Now: A Guide to Spiritual Enlightenment',
            price_cents: 1199,
            description:
              "The Power of Now is a spiritual guidebook that offers practical advice on living in the present moment. In this book, you'll learn how to quiet your mind, let go of negative thoughts, and find peace in the present moment.",
            image:
              'https://images.unsplash.com/photo-1598431390991-7c487d38c3db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9vayUyMFBvd2VyJTIwb2YlMjBOb3clM0F8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
            quantity: 12,
            categoryId: 2,
            userId: Math.floor(Math.random() * 4) + 1,
            quantitySold: Math.floor(Math.random() * 100) + 1,
          },
        ],
      },
    ],
  },
];

const products = [
    {
        id: 0,
        name: 'Banana',
        category: 'fruta',
        price: 9.90,
        image: './img/banana.png'
    },
    {
        id: 1,
        name: 'Alface',
        category: 'vegetal',
        price: 5.50,
        image: './img/alface.png'
    },
    {
        id: 2,
        name: 'Melancia',
        category: 'fruta',
        price: 10.00,
        image: './img/melancia.png'
    },
    {
        id: 3,
        name: 'Uva',
        category: 'fruta',
        price: 8.50,
        image: './img/uva.png'
    },
    {
        id: 4,
        name: 'Brócolis',
        category: 'vegetal',
        price: 4.90,
        image: './img/brocolis.png'
    },
]

let productsCart = []

const tagBody = document.querySelector('body')

const logo = document.createElement('h1')
logo.innerText = 'Virtual Market'
logo.classList.add('logo')
tagBody.appendChild(logo)

const mainContent = document.createElement('main')
mainContent.classList.add('mainContent')
tagBody.appendChild(mainContent)

const productSection = document.createElement('section')
productSection.classList.add('checkoutScreen')
mainContent.appendChild(productSection)


function listProducts () {
    const productList = document.createElement('ul')
    productList.classList.add('list')
    productSection.appendChild(productList)

    products.forEach(product => {
        const listItem = document.createElement('li')
        listItem.classList.add('productMoldure')
        productList.appendChild(listItem)

        const prodInformation = document.createElement('div')
        prodInformation.classList.add('productInformation')
        listItem.appendChild(prodInformation)

        const prodImg = document.createElement('img')
        prodImg.classList.add('productImg')
        prodImg.src = product.image
        prodInformation.appendChild(prodImg)

        const blockContainer = document.createElement('div')
        prodInformation.appendChild(blockContainer)

        const productName = document.createElement('h3')
        productName.classList.add('itemName')
        productName.innerText = product.name
        blockContainer.appendChild(productName)

        const productCategory = document.createElement('h4')
        productCategory.classList.add('productCategory')
        productCategory.innerText = product.category
        blockContainer.appendChild(productCategory)

        const productSmallContainer = document.createElement('div')
        productSmallContainer.classList.add('productSmallContainer')
        listItem.appendChild(productSmallContainer)

        const itemValue = document.createElement('h3')
        itemValue.classList.add('itemValue')
        itemValue.innerText = `R$ ${product.price.toFixed(2).replace('.', ',')}`
        productSmallContainer.appendChild(itemValue)

        const productButton = document.createElement('button')
        productButton.classList.add('buttonAdd')
        productButton.id = product.id
        productButton.innerText = 'Comprar'
        productSmallContainer.appendChild(productButton)

        productButton.addEventListener('click', event => {
            renderProductList.innerHTML = ''
        
            const itemId = event.target.id
        
            productsCart.push(products[itemId])
            listCart()
            sumTotal()
        })
    })
}

listProducts()

const cartSection = document.createElement('section')
cartSection.classList.add('productScreen')
mainContent.appendChild(cartSection)

const productCartList = document.createElement('ul')
productCartList.classList.add('list')
cartSection.appendChild(productCartList)

const listItemDescription = document.createElement('li')
listItemDescription.classList.add('moldure', 'description')
productCartList.appendChild(listItemDescription)

const descriptionName = document.createElement('h3')
descriptionName.classList.add('itemName')
descriptionName.innerText = 'Item'
listItemDescription.appendChild(descriptionName)

const descriptionValue = document.createElement('h3')
descriptionValue.classList.add('itemValue')
descriptionValue.innerText = 'Valor'
listItemDescription.appendChild(descriptionValue)

const renderProductList = document.createElement('ul')
renderProductList.classList.add('list')
productCartList.appendChild(renderProductList)

function listCart () {
    let id = 0

    productsCart.forEach(produto => {
        const listItem = document.createElement('li')
        listItem.classList.add('moldure', 'defaultItem')
        renderProductList.appendChild(listItem)

        const productName = document.createElement('h3')
        productName.classList.add('itemName')
        productName.innerText = produto.name
        listItem.appendChild(productName)

        const leftContainer = document.createElement('div')
        leftContainer.classList.add('leftContainerCartItem')
        listItem.appendChild(leftContainer)

        const productValue = document.createElement('h3')
        productValue.classList.add('itemValue')
        productValue.innerText = `R$ ${produto.price.toFixed(2).replace('.', ',')}`
        leftContainer.appendChild(productValue)

        const removeButton = document.createElement('img')
        removeButton.classList.add('removeButton')
        removeButton.id = id
        removeButton.src = './img/trash-can.png'
        leftContainer.appendChild(removeButton)

        listItem.addEventListener('mouseenter', event => {
            removeButton.classList.add('visible')
        })

        listItem.addEventListener('mouseleave', event => {
            removeButton.classList.remove('visible')
        })

        removeButton.addEventListener('click', event => {
            productsCart.splice(removeButton.id, 1)
            renderProductList.innerHTML = ''
            listCart()
            sumTotal()
        })

        id++
    })
}

listCart()

const itemTotal = document.createElement('h3')
itemTotal.classList.add('moldure', 'total')
productCartList.appendChild(itemTotal)

const totalName = document.createElement('h3')
totalName.classList.add('itemName', 'totalName')
totalName.innerText = 'Total'
itemTotal.appendChild(totalName)

const totalValue = document.createElement('h3')
totalValue.classList.add('itemValue')
itemTotal.appendChild(totalValue)

const itemButton = document.createElement('li')
itemButton.classList.add('liButton')
productCartList.appendChild(itemButton)

const checkoutButton = document.createElement('button')
checkoutButton.classList.add('moldure', 'checkoutButton')
checkoutButton.innerText = 'Finalizar compra'
itemButton.appendChild(checkoutButton)

function sumTotal () {
    let sum = 0
    
    productsCart.forEach(product => {
         sum += product.price
    })

    totalValue.innerText = `R$ ${sum.toFixed(2).replace('.', ',')}`
}

sumTotal()

checkoutButton.addEventListener('click', event => {
    productsCart = []
    renderProductList.innerHTML = ''
    sumTotal()
})
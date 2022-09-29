// Menu: Resize an Image
// Description: Select an Image in Finder to Resize
// Author: John Lindquist
// Twitter: @johnlindquist

let Jimp = await npm("jimp")

let imagePath = await getSelectedFile()
if (!imagePath)
  imagePath = await selectFile(`Choose an image:`)

console.log({ imagePath })

let extension = path.extname(imagePath)
let allowImageExtensions = [".png", ".jpg"]
while (!allowImageExtensions.includes(extension)) {
  let fileName = path.basename(imagePath)

  imagePath = await selectFile(
    `${fileName} wasn't an image:`
  )
  if (!imagePath) exit()

  extension = path.extname(imagePath)
}

let width = Number(
  await arg({
    placeholder: "Enter width",
    hint: imagePath,
    panel: `<img src="${imagePath}" class="w-full"/>`,
  })
)

let image = await Jimp.read(imagePath)

let newHeight = Math.floor(
  image.bitmap.height * (width / image.bitmap.width)
)

let resizedImagePath = imagePath.replace(
  new RegExp(`${extension}$`),
  `-${width}${extension}`
)

await image.resize(width, newHeight).write(resizedImagePath)
revealFile(resizedImagePath)

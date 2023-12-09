/*
# Resize an Image
- Prompts user to install "jimp"
- Uses image path from currently selected file in Finder
- Prompts user for resize dimensions
- Resizes and reveals new file in Finder
*/

// Name: Resize an Image
// Description: Select an Image in Finder to Resize
// Author: John Lindquist
// Twitter: @johnlindquist

import "@johnlindquist/kit"

import Jimp from "jimp"
let imagePath = await getSelectedFile()
if (!imagePath) imagePath = await selectFile(`Choose an image:`)

let extension = path.extname(imagePath)
let allowImageExtensions = [".png", ".jpg"]
while (!allowImageExtensions.includes(extension)) {
  let fileName = path.basename(imagePath)

  imagePath = await selectFile(`${fileName} wasn't an image:`)
  if (!imagePath) exit()

  extension = path.extname(imagePath)
}

let width = Number(await arg("Enter width to resize image to:", md(`![${imagePath}](${imagePath})`)))

let image = await Jimp.read(imagePath)

let newHeight = Math.floor(image.bitmap.height * (width / image.bitmap.width))

let resizedImagePath = imagePath.replace(new RegExp(`${extension}$`), `-${width}${extension}`)

log({ resizedImagePath })

await image.resize(width, newHeight).writeAsync(resizedImagePath)

revealFile(resizedImagePath)

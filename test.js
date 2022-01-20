let img = ["aaa","bbb"]
for (let i in img) {
  console.log(img[i].replace(/^data:image\/\w+;base64,/, ""))
}
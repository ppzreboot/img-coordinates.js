interface Color {
    r: number
    g: number
    b: number
    a: number
}

export
function get_img_coordinates(img: HTMLImageElement) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)

    const { width, height } = img
    const data = ctx.getImageData(0, 0, width, height).data

    const coor: Color[][] = []
    let x = 0, y = 0
    while(true) {
        const row = coor[y] ??= []
        const first_i = y*width*4 + x*4
        row.push({
            r: data[first_i],
            g: data[first_i + 1],
            b: data[first_i + 2],
            a: data[first_i + 3],
        })
        if (x === width - 1) {
            if (y === height - 1) // 结束
                break
            else { // 下一行
                x = 0
                y ++
            }
        } else // 下一个像素
            x ++
    }
    return { coor, width, height }
}

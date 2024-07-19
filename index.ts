export
interface Color {
    r: number
    g: number
    b: number
    a: number
}

export
type Coordinates_data = Color[][]

export
interface Coordinates {
    width: number
    height: number
    data: Coordinates_data
}

export
function get_img_coordinates(img: HTMLImageElement): Coordinates {
    const { width, height } = img

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)

    const img_data = ctx.getImageData(0, 0, width, height).data

    const data: Coordinates_data = []
    let x = 0, y = 0
    while(true) {
        const row = data[y] ??= []
        const first_i = y*width*4 + x*4
        row.push({
            r: img_data[first_i],
            g: img_data[first_i + 1],
            b: img_data[first_i + 2],
            a: img_data[first_i + 3],
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
    return { data, width, height }
}

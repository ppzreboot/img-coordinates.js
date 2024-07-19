export function get_img_coordinates(img) {
    var _a;
    var width = img.width, height = img.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, width, height).data;
    var coor = [];
    var x = 0, y = 0;
    while (true) {
        var row = (_a = coor[y]) !== null && _a !== void 0 ? _a : (coor[y] = []);
        var first_i = y * width * 4 + x * 4;
        row.push({
            r: data[first_i],
            g: data[first_i + 1],
            b: data[first_i + 2],
            a: data[first_i + 3],
        });
        if (x === width - 1) {
            if (y === height - 1) // 结束
                break;
            else { // 下一行
                x = 0;
                y++;
            }
        }
        else // 下一个像素
            x++;
    }
    return { coor: coor, width: width, height: height };
}

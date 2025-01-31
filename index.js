export function get_img_coordinates(img) {
    var _a;
    var width = img.width, height = img.height;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var img_data = ctx.getImageData(0, 0, width, height).data;
    var data = [];
    var x = 0, y = 0;
    while (true) {
        var row = (_a = data[y]) !== null && _a !== void 0 ? _a : (data[y] = []);
        var first_i = y * width * 4 + x * 4;
        row.push({
            r: img_data[first_i],
            g: img_data[first_i + 1],
            b: img_data[first_i + 2],
            a: img_data[first_i + 3],
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
    return { data: data, width: width, height: height };
}

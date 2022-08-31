export function addfont(pdf) {

    var font = 'AADSSDDT12......'     // ←就是很长那串
    pdf.addFileToVFS('bolds', font)

    return true;

}
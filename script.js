// 获取页面元素
const uploadInput = document.getElementById('uploadInput');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalSize = document.getElementById('originalSize');
const compressedSize = document.getElementById('compressedSize');
const downloadBtn = document.getElementById('downloadBtn');

let originalFile = null;
let compressedBlob = null;

// 监听压缩比例滑块变化，实时显示数值
qualityRange.addEventListener('input', function() {
    qualityValue.textContent = qualityRange.value + '%';
    if (originalFile) {
        compressAndPreview(originalFile);
    }
});

// 监听文件上传
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        originalFile = file;
        previewOriginal(file);
        compressAndPreview(file);
    } else {
        alert('请上传 PNG 或 JPG 格式的图片');
    }
});

// 预览原图
function previewOriginal(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        originalImage.src = e.target.result;
        originalImage.style.display = 'block';
        originalSize.textContent = '文件大小：' + formatSize(file.size);
    };
    reader.readAsDataURL(file);
}

// 压缩并预览图片
function compressAndPreview(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // 创建 canvas 进行压缩
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // 计算压缩质量
            let quality = parseInt(qualityRange.value, 10) / 100;
            let mimeType = file.type;
            // PNG 只能转为 JPEG 进行有损压缩
            if (file.type === 'image/png') {
                mimeType = 'image/jpeg';
            }
            canvas.toBlob(function(blob) {
                compressedBlob = blob;
                compressedImage.src = URL.createObjectURL(blob);
                compressedImage.style.display = 'block';
                compressedSize.textContent = '文件大小：' + formatSize(blob.size);
                downloadBtn.style.display = 'block';
            }, mimeType, quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 格式化文件大小显示
function formatSize(size) {
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / 1024 / 1024).toFixed(2) + ' MB';
}

// 下载压缩后的图片
downloadBtn.addEventListener('click', function() {
    if (!compressedBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(compressedBlob);
    a.download = 'compressed-image.jpg';
    a.click();
}); 
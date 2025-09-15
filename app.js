document.addEventListener('touchend', (e) => {
    const touches = e.changedTouches;
    const messageElement = document.getElementById('message');

    // 檢查觸控點數量
    if (touches.length !== 2) {
        messageElement.textContent = `請用兩根手指輕觸螢幕。`;
        messageElement.style.color = "red";
        console.log(`❌ 驗證失敗：觸控點數量不對，需要2個。`);
        return;
    }

    // 將像素座標正規化為0到1之間的相對值
    const points = [];
    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        points.push({
            x: touch.clientX / window.innerWidth,
            y: touch.clientY / window.innerHeight
        });
    }

    // 定義一個合理的距離範圍
    // 這個範圍可以根據測試的裝置調整
    const minDistance = 0.05; // 例如，不能太近
    const maxDistance = 0.5;  // 例如，不能太遠
    
    const distance = Math.sqrt(
        Math.pow(points[1].x - points[0].x, 2) +
        Math.pow(points[1].y - points[0].y, 2)
    );

    // 驗證距離是否在範圍內
    if (distance >= minDistance && distance <= maxDistance) {
        messageElement.textContent = "驗證成功！";
        messageElement.style.color = "green";
        console.log("✅ 驗證成功！");
    } else {
        messageElement.textContent = "請調整兩指間的距離，重新嘗試。";
        messageElement.style.color = "red";
        console.log("❌ 驗證失敗：兩點距離不符。");
    }
});

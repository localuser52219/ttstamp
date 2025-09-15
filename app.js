let stampCount = 0;

document.addEventListener('touchend', (e) => {
    const touches = e.changedTouches;
    const messageElement = document.getElementById('message');
    const counterElement = document.getElementById('counter');
    const distanceDisplay = document.getElementById('distance-display');

    // 每次觸摸結束，蓋印次數加一
    stampCount++;
    counterElement.textContent = `蓋印次數: ${stampCount}`;

    // 如果觸控點數量不正確，只更新訊息
    if (touches.length !== 2) {
        messageElement.textContent = `請用兩根手指輕觸螢幕。`;
        messageElement.style.color = "red";
        distanceDisplay.textContent = "當前距離數值: 無法計算";
        console.log(`❌ 驗證失敗 (第 ${stampCount} 次)：觸控點數量不對，需要2個。`);
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

    // 計算兩點間的距離
    const distance = Math.sqrt(
        Math.pow(points[1].x - points[0].x, 2) +
        Math.pow(points[1].y - points[0].y, 2)
    );

    // 在畫面上顯示計算出的數值，保留三位小數
    distanceDisplay.textContent = `當前距離數值: ${distance.toFixed(3)}`;

    // 定義驗證所需的距離範圍
    const minDistance = 0.05;
    const maxDistance = 0.5;
    
    // 驗證距離是否在範圍內
    if (distance >= minDistance && distance <= maxDistance) {
        messageElement.textContent = "驗證成功！";
        messageElement.style.color = "green";
        console.log(`✅ 驗證成功 (第 ${stampCount} 次)！`);
    } else {
        messageElement.textContent = "請調整兩指間的距離，重新嘗試。";
        messageElement.style.color = "red";
        console.log(`❌ 驗證失敗 (第 ${stampCount} 次)：兩點距離不符。`);
    }
});

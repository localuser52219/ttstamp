document.addEventListener('touchend', (e) => {
    const touches = e.changedTouches;
    const messageElement = document.getElementById('message');

    // 1. 檢查觸控點數量
    if (touches.length !== 4) {
        messageElement.textContent = "請確認印章已完整接觸螢幕。";
        messageElement.style.color = "red";
        console.log("❌ 驗證失敗：觸控點數量不對，需要4個。");
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

    // 2. 判斷四個點是否構成一個正方形
    // 增加容錯：將容許的誤差值從0.05提升到0.15，以適應不同尺寸和蓋印角度
    const tolerance = 0.15;
    const isSquare = validateSquare(points, tolerance);

    if (isSquare) {
        messageElement.textContent = "驗證成功！";
        messageElement.style.color = "green";
        console.log("✅ 驗證成功！");
    } else {
        messageElement.textContent = "印章圖案不正確，請重新嘗試。";
        messageElement.style.color = "red";
        console.log("❌ 驗證失敗：圖案不符。");
    }
});

/**
 * 驗證四個點是否構成一個正方形
 * @param {Array<Object>} points - 正規化後的四個觸控點
 * @param {number} tolerance - 容許的誤差值
 * @returns {boolean} - 是否為正方形
 */
function validateSquare(points, tolerance) {
    // 根據X座標排序，方便後續計算，但要注意，排序後點的順序可能不是物理上的順序
    // 為了通用性，我們不依賴排序，而是計算所有點之間的距離來判斷
    const distance = (p1, p2) => Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

    // 計算所有點之間的距離
    const dists = [];
    for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
            dists.push(distance(points[i], points[j]));
        }
    }

    // 排序所有距離，方便比較
    dists.sort((a, b) => a - b);

    // 期望的距離關係：4個邊長相等，2個對角線長度相等且約為邊長的sqrt(2)倍
    // 找出最小的4個距離（應為邊長）
    const side1 = dists[0];
    const side2 = dists[1];
    const side3 = dists[2];
    const side4 = dists[3];

    // 找出最大的2個距離（應為對角線）
    const diagonal1 = dists[4];
    const diagonal2 = dists[5];

    // 檢查四個邊長是否大致相等
    const sidesEqual = (
        Math.abs(side1 - side2) < tolerance &&
        Math.abs(side2 - side3) < tolerance &&
        Math.abs(side3 - side4) < tolerance
    );

    // 檢查兩條對角線是否大致相等
    const diagonalsEqual = Math.abs(diagonal1 - diagonal2) < tolerance;

    // 檢查對角線是否約為邊長的sqrt(2)倍
    const diagVsSide = Math.abs(diagonal1 - (side1 * Math.sqrt(2))) / (side1 * Math.sqrt(2));

    return sidesEqual && diagonalsEqual && diagVsSide < tolerance;
}

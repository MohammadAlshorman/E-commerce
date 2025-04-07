import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-wheel',
    standalone: true,
    templateUrl: './wheel.component.html',
    styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {

    @Output() spinCompleted = new EventEmitter<void>();

    vouchers = [
        { code: 'DISCOUNT10', amount: 10 },
        { code: 'DISCOUNT20', amount: 20 },
        { code: 'DISCOUNT30', amount: 30 },
        { code: 'DISCOUNT40', amount: 40 },
    ];

    selectedVoucher: any = null;

    ngOnInit(): void {
        this.startSpin();
    }

    startSpin() {
        const now = Date.now();
        const lastSpin = localStorage.getItem('lastSpin');

        if (lastSpin && now - parseInt(lastSpin) < 60000) {
            const secondsLeft = Math.ceil((60000 - (now - parseInt(lastSpin))) / 1000);
            Swal.fire({
                icon: 'info',
                title: '⏳ Wait!',
                html: `You can spin again in <b>${secondsLeft}</b> seconds.`,
                timer: 4000
            });
            this.spinCompleted.emit();
            return;
        }

        const usedCodes = JSON.parse(localStorage.getItem('usedVouchers') || '[]');
        const available = this.vouchers.filter(v => !usedCodes.includes(v.code));

        if (available.length === 0) {
            Swal.fire({
                icon: 'info',
                title: '😅 No More Vouchers',
                text: 'You already used all vouchers!',
            });
            this.spinCompleted.emit();
            return;
        }

        Swal.fire({
            title: '🎁 Spin the Wheel!',
            html: `
        <div style="position: relative; width: 250px; height: 250px; margin: auto;">
          <div id="pointer" style="
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid red;
            z-index: 10;
          "></div>

          <svg id="wheel" width="250" height="250" viewBox="0 0 200 200" style="transform-box: fill-box;">
            ${this.generateWheelSectors()}
            <circle cx="100" cy="100" r="98" fill="none" stroke="#333" stroke-width="2"/>
          </svg>
        </div>
      `,
            showConfirmButton: false,
            allowOutsideClick: false,
            background: '#fff',
            didOpen: () => {
                const wheel = document.getElementById('wheel') as HTMLElement;
                wheel.animate([
                    { transform: 'rotate(0deg)' },
                    { transform: 'rotate(1440deg)' }
                ], {
                    duration: 3000,
                    easing: 'ease-out'
                });

                setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * available.length);
                    this.selectedVoucher = available[randomIndex];

                    localStorage.setItem('lastSpin', now.toString());
                    localStorage.setItem('usedVouchers', JSON.stringify([...usedCodes, this.selectedVoucher.code]));

                    // 🎵 صوت الفوز
                    const winSound = new Audio('assets/win-sound.mp3');
                    winSound.play();

                    this.showResultPopup(this.selectedVoucher);
                }, 3000);
            }
        });
    }

    generateWheelSectors(): string {
        const count = this.vouchers.length;
        const angle = 360 / count;
        let colors = ['#f44336', '#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#00bcd4'];
        let svgParts: string[] = [];

        for (let i = 0; i < count; i++) {
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            const largeArc = angle > 180 ? 1 : 0;
            const x1 = 100 + 100 * Math.cos((Math.PI * startAngle) / 180);
            const y1 = 100 + 100 * Math.sin((Math.PI * startAngle) / 180);
            const x2 = 100 + 100 * Math.cos((Math.PI * endAngle) / 180);
            const y2 = 100 + 100 * Math.sin((Math.PI * endAngle) / 180);

            svgParts.push(`
        <path d="M100,100 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z"
          fill="${colors[i % colors.length]}" />
        <text x="100" y="100" text-anchor="middle" dy=".3em" font-size="10"
          transform="rotate(${startAngle + angle / 2}, 100, 100)" fill="#fff">
          ${this.vouchers[i].code}
        </text>
      `);
        }

        return svgParts.join('');
    }

    showResultPopup(voucher: any) {
        Swal.fire({
            icon: 'success',
            title: '🎉 You Won!',
            html: `
        <p>Voucher:</p>
        <h2><code id="voucherCode">${voucher.code}</code></h2>
        <p><b>${voucher.amount}</b></p>
        <button id="copyBtn" class="swal2-confirm swal2-styled" style="background-color: #3085d6; margin-top: 10px;">
          Copy Code
        </button>
      `,
            showConfirmButton: false
        });

        setTimeout(() => {
            const copyBtn = document.getElementById('copyBtn');
            copyBtn?.addEventListener('click', () => {
                const code = document.getElementById('voucherCode')?.textContent || '';
                navigator.clipboard.writeText(code);

                // 🔔 إشعار "Copied" وبعدها تحويل
                Swal.fire({
                    icon: 'success',
                    title: '✅ Copied!',
                    text: `Code "${code}" copied to clipboard.`,
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#3085d6'
                }).then(() => {
                    // ✅ التوجيه إلى الصفحة المطلوبة بعد الضغط على "Continue"
                    window.location.href = '/category'; // 🛍️ عدّل الرابط حسب صفحتك
                });
            });
        }, 100);


        this.spinCompleted.emit();
    }
}

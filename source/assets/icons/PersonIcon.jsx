import React from 'react';

export default () =>
    <svg width="100%" height="100%" viewBox="0 0 24 32">
        <defs>
            <path id="b" d="M0 0h356v400H0z"/>
            <filter id="a" width="103.9%" height="103.5%" x="-1.4%" y="-1.2%" filterUnits="objectBoundingBox">
                <feOffset dx="2" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/>
                <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2"/>
                <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.330474411 0"/>
            </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
            <path fill="#DFE8F0" d="M-1298-676H302v2543h-1600z"/>
            <g transform="translate(-72 -76)">
                <use fill="#000" filter="url(#a)"/>
                <use fill="#FFF"/>
            </g>
            <path stroke="#333" strokeWidth="1.684" d="M252.842-59.158h14.316v14.316h-14.316z"/>
            <path fill="#333" fillRule="nonzero" d="M258.737-46.93v-.842c0-.252-.169-.42-.421-.42h-.421c-.169 0-.295-.211-.169-.38l1.685-1.684a.407.407 0 0 0 0-.59l-.59-.589a.407.407 0 0 0-.59 0l-1.684 1.684c-.126.127-.379.042-.379-.168v-.421c0-.253-.168-.421-.42-.421h-.843c-.252 0-.42.168-.42.42v3.37c0 .252.168.42.42.42h3.369c.294.042.463-.126.463-.379zM261.726-52.53l1.685-1.684c.126-.126.378-.042.378.169v.42c0 .253.169.422.422.422h.842c.252 0 .42-.169.42-.421v-3.369c0-.252-.168-.42-.42-.42h-3.369c-.252 0-.42.168-.42.42v.842c0 .253.168.421.42.421h.421c.169 0 .295.21.169.38l-1.685 1.683a.407.407 0 0 0 0 .59l.59.59c.126.126.379.126.547-.043z"/>
            <g fill="#3DB4E5">
                <path d="M193-53v-5h-2v5h-5v2h5v5h2v-5h5v-2h-5zm-1 13c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z"/>
            </g>
            <g fill="#333">
                <path fillRule="nonzero" d="M230.516-57.853L232.663-60 236-56.663l-2.147 2.147-3.337-3.337zM220-44l1.11-3.802 2.692 2.692L220-44zm1.965-5.302l7.373-7.373 3.337 3.337-7.373 7.373-3.337-3.337z"/>
            </g>
            <g transform="translate(-16 -12)">
                <circle cx="28" cy="28" r="28" fill="#0AA89E"/>
                <g fill="#FFF" fillRule="nonzero">
                    <path d="M27.955 27.65c3.472 0 6.287-3.503 6.287-7.825S33.318 12 27.955 12c-5.362 0-6.286 3.503-6.286 7.825s2.814 7.825 6.286 7.825zM16.081 39.598c-.001-.264-.002-.074 0 0zM39.83 39.804c.003-.072 0-.5 0 0zM39.816 39.282c-.117-7.528-1.076-9.674-8.418-11.031 0 0-1.034 1.35-3.443 1.35s-3.442-1.35-3.442-1.35c-7.262 1.343-8.28 3.456-8.414 10.786-.01.599-.016.63-.018.561l.001.79S17.83 44 27.955 44s11.874-3.611 11.874-3.611v-.585c-.002.043-.006-.04-.013-.522z"/>
                </g>
            </g>
        </g>
    </svg>;

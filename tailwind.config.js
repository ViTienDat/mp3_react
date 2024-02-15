/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-1": "#130C1C",
        "main-2": "#170f23",
        "main-3": "#FEFFFF0D",
        "overlay-30": "rgba(0,0,0,0.3)",
        "violet-ct": "rgba(51,16,76,.95)"
      },
      colors: {
        "main-1": "#130C1C",
        "main-2": "#170f23",
        "main-3": "#2a213a",
        "text-1": "#FFFFFF80",
        "overlay-30": "rgba(0,0,0,0.3)",
      },
      keyframes: {
        "scale-up-image": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)"
          },
          "100%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)"
          }
        },
        "scale-down-image": {
          "0%": {
            "-webkit-transform": "scale(1.1)",
            transform: "scale(1.1)"
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)"
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 8s linear infinite;',
        'rotate-center-pause': 'rotate-center-pause 0.3s linear 2 both;',
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-up-image': 'scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'scale-down-image': 'scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',

      }
    },
  },
  plugins: [
  ],
};

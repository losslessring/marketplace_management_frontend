import { Style } from '@/app/interfaces/style/Style'

export function setStyle(style: Style) {
    document.body.style.backgroundColor = style.globalBackgroundColor
    document.body.style.color = style.globalFontColor
}

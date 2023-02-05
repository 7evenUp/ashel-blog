import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/ru'
import dayjslib from 'dayjs'

dayjslib.locale('ru')
dayjslib.extend(localizedFormat)

export const dayjs = dayjslib
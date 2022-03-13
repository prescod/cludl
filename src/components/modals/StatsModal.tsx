import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  timeResult: number
  pushToCludleGameCom: () => void
}

const getTimerMessage = (timeSeconds: number) => {
  if (timeSeconds < 60 * 5) {
    var reward
    if (timeSeconds < 1) {
      return null
    } else if (timeSeconds < 10) {
      reward = 'Astonishing!'
    } else if (timeSeconds < 30) {
      reward = 'Amazing!'
    } else if (timeSeconds < 60) {
      reward = 'Great!'
    } else if (timeSeconds < 60 * 2) {
      reward = 'Very Good!'
    } else if (timeSeconds < 60 * 5) {
      reward = 'Good!'
    }
    const plural = timeSeconds > 1 ? 's' : ''
    return `${timeSeconds} second${plural}: ${reward}`
  } else {
    return null
  }
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  timeResult,
  pushToCludleGameCom,
}: Props) => {
  const seconds = Math.floor(timeResult / 1000)
  const timerMessage = getTimerMessage(seconds)
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />

      {isGameWon && timerMessage && (
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {timerMessage}
        </p>
      )}

      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(
                guesses,
                isGameLost,
                isHardMode,
                isDarkMode,
                isHighContrastMode,
                timerMessage
              )
              handleShare()
            }}
          >
            {SHARE_TEXT}
          </button>
        </div>
      )}

      {window.location.hostname.includes('www.cludl.com') || (
        <div>
          <p> &nbsp;</p>
          <button
            type="button"
            className="dark:text-white bg-slate-200 dark:bg-slate-600 rounded-md border border-transparent shadow-sm px-4 py-2 ring-1 text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm justify-right  px-3 mx-8"
            onClick={pushToCludleGameCom}
          >
            Send stats to www.cludl.com
          </button>
        </div>
      )}
    </BaseModal>
  )
}

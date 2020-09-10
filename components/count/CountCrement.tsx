import { IconButton } from '@chakra-ui/core'
import { ArrowUp, ArrowDown } from 'react-feather'

export const CountCrement: React.FC<{ by: number; updateCount: (by: number) => void }> = ({ by, updateCount }) => {
  const handleClick = () => {
    updateCount(by)
  }

  return (
    <IconButton
      variant='outline'
      aria-label='Increment/decrement count'
      icon={by < 0 ? <ArrowDown /> : <ArrowUp />}
      onClick={handleClick}
      m={5}
    />
  )
}

import { CountCrement } from './CountCrement'
import { CountDisplay } from './CountDisplay'
import { useQuery, useMutation, gql } from '@apollo/client'
import { UpdateCount } from './gql/UpdateCount'
import { CountQuery } from './gql/CountQuery'

/** Query to get count */
export const COUNT = gql`
  query CountQuery {
    count
  }
`

/** Mutation for changing the ocunt */
export const UPDATE_COUNT = gql`
  mutation UpdateCount($by: Int!) {
    updateCount(by: $by)
  }
`

/** Millisecs that it refetches the count */
const interval = 500

/** Increment/decrement & display for count */
export const CountManager: React.FC<{ pollInterval?: number }> = ({ pollInterval = interval }) => {
  const { data, refetch } = useQuery<CountQuery>(COUNT, {
    pollInterval,
  })
  const [updateCount] = useMutation<UpdateCount>(UPDATE_COUNT)

  const handleCrement = (by: number) => {
    updateCount({
      variables: { by },
    })
    // Update it after click
    refetch()
  }

  return (
    <>
      <CountCrement by={1} updateCount={handleCrement} />
      <CountDisplay count={data?.count} />
      <CountCrement by={-1} updateCount={handleCrement} />
    </>
  )
}

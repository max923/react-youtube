import React from "react";
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { fetchVideosIfNeeded } from '../lib/actions'

interface IProps{
  fetchVideosIfNeeded: Function
  currentPage: number
}
interface IPageSquareProps {
  active?: boolean
}
function Pagination(props: IProps): JSX.Element {
  const { currentPage } = props
  const totalPage = [1,2,3,4]
  return (
    <Wrapper>
      {
        totalPage.map(n => (
          <PageSquare
            key={n}
            active={currentPage === n}
            onClick={() => props.fetchVideosIfNeeded(n)}>{n}</PageSquare>
        ))
      }
    </Wrapper>
  )
}

export default connect(
  null,
  ({ fetchVideosIfNeeded })
)(Pagination)

const flexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
  display: flex;
  margin: 50px auto;
`
const PageSquare = styled<'button', IPageSquareProps>('button')`
  ${flexCenter}
  background: ${props => props.active ? '#f5645a' : 'none'};
  color: ${props => props.active ? '#fff' : '#2d2d2d'} ;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 20px;
  cursor: pointer;
`;
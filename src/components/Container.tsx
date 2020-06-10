import * as React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { isEmpty } from 'lodash'
import { DefaultRootState } from '../types/index'
import { flexCenter } from '../utils/flex'
// Components
import Card from './Card'
import Pagination from './Pagination'

function Container(props: DefaultRootState): JSX.Element {
  const { items, currentPage } = props
  const pageAmount = 10
  return (
    <Wrapper>
      <Row>
        {
          items
          .slice(currentPage * pageAmount - pageAmount ,currentPage * pageAmount)
          .map((item) => (
            <Card
              key={item.etag}
              snippet={item.snippet}
              videoId={item.id.videoId}
            />
          ))
        }
      </Row>
      {
        isEmpty(items) && (
          <Row>
            <EmptyItemsText>
              <p>查無資料...</p>
            </EmptyItemsText>
          </Row>
        )
      }
      {
        !isEmpty(items) && (
          <Row>
            <Pagination currentPage={currentPage} />
          </Row>
        )
      }
    </Wrapper>
  )
}

interface IAppState {
  search: DefaultRootState
}

const mapStateToProps = (store: IAppState) => {
  return {
    items: store.search.items,
    pageInfo: store.search.pageInfo,
    isLoading: store.search.isLoading,
    currentPage: store.search.currentPage,
  }
}

export default connect(mapStateToProps, null)(Container)

const Wrapper = styled.div`
  width: 90%;
  max-width: 1600px;
  margin: auto;
`
const Row = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const EmptyItemsText = styled.div`
  ${flexCenter}
  width: 100%;
  padding-top: 2rem;
  >p{
    font-size: 3rem;
  }
`
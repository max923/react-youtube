import React, { useState, useRef, useEffect } from 'react'
import { debounce } from 'lodash';
import styled from '@emotion/styled'
import { connect } from 'react-redux'
import { fetchVideos } from '../lib/actions'
import { flexCenter } from '../utils/flex'
import mq from '../utils/mq'

type InputElem = React.FormEvent<HTMLInputElement>
interface IProps {
  fetchVideos: Function
  isLoading: boolean
}

function Header(props: IProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('')
  const debunchSearch = useRef(
    debounce((text: string) => {
      props.fetchVideos(text)
    }, 1000)
  )
  function handleChange(e: InputElem): void {
    console.log(e.currentTarget.value)
    setSearchValue(e.currentTarget.value)
  }
  useEffect(() => {
    debunchSearch.current(searchValue)
  }, [searchValue])
  return (
    <Wrapper>
      <div className="center">
        <input
          autoComplete="off"
          disabled={props.isLoading}
          type="text"
          id="search-bar"
          className="default-input"
          placeholder="請輸入查詢影片"
          onChange={handleChange}
          value={searchValue}
        />
      </div>
    </Wrapper>
  )
}

const mapStateToProps = (store: {
  search: { isLoading: boolean }
}) => {
  return {
    isLoading: store.search.isLoading,
  }
}
export default connect(
  mapStateToProps,
  ({ fetchVideos })
)(Header)

const Wrapper = styled.header`
  ${flexCenter}
  width: 100%;
  height: 120px;
  background-color: #f5645a;
  ${mq[0]} {
    height: 100px;
  }
  .center{
    width: 100%;
    text-align: center;
  }
  #search-bar{
    border-bottom: solid 1px #fff;
    width: 30%;
    height: 50px;
    color: #fff;
    font-size: 2rem;
    text-decoration: none;
    ${mq[0]} {
      width: 70%;
    }
    &:focus{
      outline:none;
    }
  }
`
import * as React from 'react'
import styled from '@emotion/styled'
import { Snippet } from '../types/index'
import mq from '../utils/mq'

interface IProps {
  snippet: Snippet
  videoId: string
}

function Card(props: IProps): JSX.Element {
  const { snippet, videoId } = props
  const { thumbnails } = snippet  
  return (
    <Wrapper href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
      <figure>
        <img className="img-responsive" src={thumbnails.high.url} alt={snippet.description}/>
        <figcaption>{snippet.title}</figcaption>
      </figure>
    </Wrapper>
  )
}

export default Card

const Wrapper = styled.a`
  width: 33%;
  text-decoration: none;
  ${mq[0]} {
    width: 50%;
  }
  &:hover{
    figcaption{
      color: #888888;
    }
    img{
      opacity: .7;
    }
  }
  >figure{
    margin-right: 15px;
    margin-left: 15px;
    >figcaption{
      margin-top: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #212121
    }
  }

` 
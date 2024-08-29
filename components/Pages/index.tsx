import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import { start } from 'repl';
import { Block } from './Block.tsx';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  // let name = "خوش امدید"


  state.cart = Array.from(new Set(state.cart))


  let totalprice = 0;
  let count = 0;

  for (let cart of state.cart) {

    let book = props.books.find(book => book.title == cart)
    if (book) {
      totalprice += (book.price as number)
    }
    count += 1;

  }


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      {state.form == "bookspecs" ? <WindowFloat title='مشخصات کتاب' onclose={() => {
        delete state.form
        refresh()
      }}>
        <f-c>
          <f-15>نام کتاب:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>
        <f-c>
          <f-15>نویسنده:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>

        <f-c>
          <f-15>کشور:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>زبان:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15>تعداد صفحات:</f-15>
          <sp-2 />
          <f-15>{state.book.pages}</f-15>
        </f-c>
        <f-c>
          <f-15>سال انتشار:</f-15>
          <sp-2 />
          <f-15>{state.book.year}</f-15>
        </f-c>

        <f-c>
          <f-15>قیمت:</f-15>
          <sp-2 />
          <f-15>{state.book.price}</f-15>
          <sp-3 />
          <f-15 style={{ fontSize: 15 }}>تومان</f-15>
        </f-c>




        <br-x />
        <br-x />

        <f-cse style={{ gap: 10 }}>
          <g-b style={{ height: 40, backgroundColor: "lab(3.25 -3.45 2.3)", color: "white" }} onClick={() => {
            if (!state.fav) {
              state.fav = []
              state.form = null
            }
            if (state.fav.includes(state.book.title)) {
              state.fav = state.cart.filter(item => item !== state.book.title)
              state.form = null
            }
            else {
              state.fav.push(state.book.title)
              state.form = null
            }

            refresh()
          }}>

            <f-12>افزودن به علاقه مندی ها</f-12>
            <sp-3 />
            <f-cc><img src="https://irmapserver.ir/research/8/IMG_20240828_220857_heart.jpg" style={{ width: 30, height: 30 }} /></f-cc>

          </g-b>


          <g-b style={{ height: 40, backgroundColor: "lab(3.25 -3.45 2.3)", color: "white" }} onClick={() => {
            if (!state.cart) {
              state.cart = []
            }
            if (state.cart.includes(state.book.title)) {
              state.cart = state.cart.filter(item => item !== state.book.title)
              state.form = null
            }
            else {
              state.cart.push(state.book.title)
              state.form = null

            }
            refresh()
          }}>
            <f-12>افزودن به سبد خرید</f-12>
            <sp-3 />
            <f-cc><img src='https://irmapserver.ir/research/8/3501047cart.png' style={{ width: 30, height: 30 }} /></f-cc>
          </g-b>
        </f-cse>





      </WindowFloat> : null}
      <Window title={"سبدخرید"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)", backgroundColor: "gainsboro" }}>




        <f-cse style={{ marginTop: "65px" }}>

          <f-cc>
            <f-12><img src='https://irmapserver.ir/research/8/3501047cart.png' style={{ width: 30, height: 30 }} /></f-12>
            <sp-2 />
            <f-12 style={{ fontSize: 20 }}>تعداد کتاب : </f-12>
            <f-12 style={{ fontSize: 20 }}>{(count as number).toLocaleString("fa-IR")}</f-12>
          </f-cc>







          <f-cc>
            <f-12><img src='https://irmapserver.ir/research/8/dollars.png' style={{ width: 30, height: 30 }} /></f-12>


            <sp-2 />
            <f-12 style={{ fontSize: 20 }}>مجموع قابل پرداخت:<b></b>  </f-12>
            <sp-2 />

            <f-12 style={{ fontSize: 20 }}>{(totalprice as number).toLocaleString("fa-IR")}</f-12>
            <sp-2 />
            <f-12 style={{ fontSize: 20 }}>تومان</f-12>
          </f-cc>


        </f-cse>




      </Window>


      <Window title={"کتاب"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}

        <br-x />
        <br-x />


        <w-cse style={{ gap: 5, padding: 5 }}>

          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh} />
          })}

        </w-cse>




      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;
  let books = await global.db.collection("books").find({}).toArray()
  for (let book of books) {
    book.imageLink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
  }
  console.log(books)


  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}
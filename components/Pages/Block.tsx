import { relative } from "path"

export const Block = props => {
  //  let book = props.book
  if (!props.state.fav) {
    props.state.fav = []
  }

  if (!props.state.cart) {
    props.state.cart = []
  }



  return <f-x style={{ height: 200, width: 400, minWidth: 150, flex: 1, position: "relative" }} onClick={() => {
    props.state.form = "bookspecs"
    props.state.book = props.book
    props.refresh()

  }}>
    <img
      className={global.styles.hoverzoom_nofade}
      src={props.book.imageLink}
      style={{ height: 150, width: 200, objectFit: "fill", minWidth: 150, flex: 1 }}
    />
    <c-x style={{ width: 180, height: 50, backgroundColor: "white", position: "absolute", bottom: 0, right: 3 }}>
      <br-xx />
      <f-x><del>{props.book.price * 1.2}</del></f-x>
      <f-x><b>قیمت:{props.book.price}</b></f-x>


    </c-x>


    {props.state.fav.includes(props.book.title) ?
      <img src="https://irmapserver.ir/research/8/IMG_20240829_galb.jpg"
        style={{ height: 28, width: 28, position: "absolute", top: 165, right: 145 }} /> : null}

    {props.state.cart.includes(props.book.title) ? <img src="https://irmapserver.ir/research/8/tik.png"
      style={{ width: 42, height: 42, position: "absolute",top: 160, right: 105 }} /> : null}

    {/* {props.state.cart.includes(props.book.title) ? <img src="https://irmapserver.ir/research/8/tik.png" 
       style={{ width: 30, height: 30, position: "absolute", marginTop: 225, marginRight: 8 }} /> : null} */}

  </f-x>
}
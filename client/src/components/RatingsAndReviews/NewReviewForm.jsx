import React, { useState } from 'react';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";



// TO DO : Upload photos

const NewReviewForm = ({submitReview, characteristics, id}) => {

  const [ isSize, setIsSize ] = useState(Object.keys(characteristics).indexOf('Size') > -1)
  const [ isWidth, setIsWidth ] = useState(Object.keys(characteristics).indexOf('Width') > -1)
  const [ isComfort, setIsComfort ] = useState(Object.keys(characteristics).indexOf('Comfort') > -1)
  const [ isQuality, setIsQuality ] = useState(Object.keys(characteristics).indexOf('Quality') > -1)
  const [ isLength, setIsLength ] = useState(Object.keys(characteristics).indexOf('Length') > -1)
  const [ isFit, setIsFit ] = useState(Object.keys(characteristics).indexOf('Fit') > -1)

  // const [ rating, setRating ] = useState("")
  const ratingText = ['Poor', 'Fair', 'Average', 'Good', 'Great']
  // const onRatingChange = (e) => {
  //   console.log(e.target.value)
  //   setRating(e.target.value)
  // }
  const [hasRated, setHasRated] = useState(false)

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);

  const [ size , setSize ] = useState("")
  const sizeText = ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide']
  const onSizeChange = (e) => {
    setSize(e.target.value)
  }

  const [ width , setWidth ] = useState("")
  const widthText = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']
  const onWidthChange = (e) => {
    setWidth(e.target.value)
  }

  const [ comfort , setComfort ] = useState("")
  const comfortText = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']
  const onComfortChange = (e) => {
    setComfort(e.target.value)
  }

  const [ quality , setQuality ] = useState("")
  const qualityText = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']
  const onQualityChange = (e) => {
    setQuality(e.target.value)
  }

  const [ length , setLength ] = useState("")
  const lengthText = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']
  const onLengthChange = (e) => {
    setLength(e.target.value)
  }

  const [ fit , setFit ] = useState("")
  const fitText = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  const onFitChange = (e) => {
    setFit(e.target.value)
  }

  const [ recommend, setRecommend ] = useState("true")
  const onRecommendChange = (e) => {
    setRecommend(e.target.value)
  }

  const [ reviewBody, setReviewBody ] = useState("")
  const onReviewBodyChange = (e) => {
    setReviewBody(e.target.value)
  }

  const [ reviewSummary, setReviewSummary ] = useState("")
  const onReviewSummaryChange = (e) => {
    setReviewSummary(e.target.value)
  }

  const [ nickName, setNickName ] = useState("")
  const onNickNameChange = (e) => {
    setNickName(e.target.value)
  }

  const [ email, setEmail ] = useState("")
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const [ photo, setPhoto ] = useState("")
  const onPhotoChange = (e) => {
    setPhoto(e.target.value)
  }

  return (
    <div className="rr-modal-content">

    <div className="rr-form-topper">
      <h3>Write Your Review</h3>
      <h1 className="rr-form-exit" onClick={submitReview}> <RxCross1 /></h1>
    </div>

{/* Thanks to https://dev.to/kartikbudhraja/creating-a-dynamic-star-rating-system-in-react-2c8 */}
      <div>
        <form>
          <div className="rr-form-stars">
            <p>RATING: {hasRated ? ratingText[rating - 1] : ""}</p>
            <span>
            {[...Array(totalStars)].map((star, index) => {
              const currentRating = index + 1;

              return (
                <label key={'star' + index}>
                  <input
                    id={'star' + index}
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onChange={() => {
                      setRating(currentRating)
                      setHasRated(true)
                    }}
                  />
                  <span
                    className="rr-star"
                    style={{
                      color:
                        currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    &#9733;
                  </span>
                </label>
              );
            })}
            </span>
          </div>

            <div className="rr-form-person">
              <label>
                What is your nickname:
                <input type="text" name="nickname" id="nickname" value={nickName} onChange={onNickNameChange}/>
              </label>

              <label>
                Email:
                <input type="text" name="email" id="email" value={email} onChange={onEmailChange}/>
              </label>
            </div>


          <div className="rr-form-characteristics">
            {isSize ?
              <div key="size-exists">
                <br></br>
                <p>SIZE:</p>
                {sizeText.map((currentSize, index)=>{
                  return (
                    <>
                      <input
                        type="radio"
                        name={'size' + (index + 1)}
                        role="size"
                        value={(index + 1).toString()}
                        key={'S' + currentSize}
                        checked={size === (index + 1).toString()}
                        onChange={onSizeChange}
                      />
                      <label>{currentSize}</label>
                    </>
                  )
                })}
              </div>
              : <></>
            }

            {isWidth ?
            <div>
              <br></br>
              <p>WIDTH:</p>
              {widthText.map((currentWidth, index)=>{
                return (
                  <>
                    <input
                      type="radio"
                      name="width"
                      value={(index + 1).toString()}
                      key={'W' + index}
                      checked={width === (index + 1).toString()}
                      onChange={onWidthChange}
                    />
                    <label>{currentWidth}</label>
                  </>
                )
              })}
            </div>
            : <></>
            }

            {isComfort ?
            <div>
              <br></br>
              <p>COMFORT:</p>
              {comfortText.map((currentComfort, index)=>{
                return (
                  <>
                    <input
                      type="radio"
                      name="comfort"
                      value={(index + 1).toString()}
                      key={'C' + index}
                      checked={comfort === (index + 1).toString()}
                      onChange={onComfortChange}
                    />
                    <label>{currentComfort}</label>
                  </>
                )
              })}
            </div>
            : <></>
            }

            {isQuality ?
            <div>
              <br></br>
              <p>QUALITY:</p>
              {qualityText.map((currentQuality, index)=>{
                return (
                  <>
                    <input
                      type="radio"
                      name="quality"
                      value={(index + 1).toString()}
                      key={'Q' + index}
                      checked={quality === (index + 1).toString()}
                      onChange={onQualityChange}
                    />
                    <label>{currentQuality}</label>
                  </>
                )
              })}
            </div>
            : <></>
            }

            {isLength ?
            <div>
              <br></br>
              <p>LENGTH:</p>
              {lengthText.map((currentLength, index)=>{
                return (
                  <>
                    <input
                      type="radio"
                      name="length"
                      value={(index + 1).toString()}
                      key={'L' + index}
                      checked={length === (index + 1).toString()}
                      onChange={onLengthChange}
                    />
                    <label>{currentLength}</label>
                  </>
                )
              })}
            </div>
            : <></>
            }

            {isFit ?
            <div>
              <br></br>
              <p>FIT:</p>
              {fitText.map((currentFit, index)=>{
                return (
                  <>
                    <input
                      type="radio"
                      name="fit"
                      value={(index + 1).toString()}
                      key={'F' + index}
                      checked={fit === (index + 1).toString()}
                      onChange={onFitChange}
                    />
                    <label>{currentFit}</label>
                  </>
                )
              })}
            </div>
            : <></>
            }
          </div>

          <br></br>

          <p>Do you Recommend this Product?</p>
          <label>
            Yes
            <input name="recommend" type="radio" value="true" checked={recommend === "true"} onChange={onRecommendChange}/>
          </label>
          <label>
            No
            <input name="recommend" type="radio" value="false" checked={recommend === "false"} onChange={onRecommendChange}/>
          </label>
          <br></br>

          <br></br>
          <label>
            Summary:
          </label>
            <br></br>
            <textarea id="rr-summary-review-body" className="rr-summary-review-body" type="text" rows="3" name="summary" value={reviewSummary} onChange={onReviewSummaryChange} placeholder="A short summary of your thoughts..."/>

          <br></br>
          <label>
            Review:
          </label>
            <br></br>
            <textarea id="rr-form-review-body" className="rr-form-review-body" type="text" name="review" value={reviewBody} onChange={onReviewBodyChange} rows="6" placeholder="Must be at least 60 characters. Tell us what you really think..."/>

          <br></br>

          <div className="rr-form-pic-and-btn">

            <label>
                  Picture:
                  <input type="text" name="photo" id="photo" value={photo} onChange={onPhotoChange}/>
            </label>

            <input className="rr-see-more-btn" type="submit" id="form-submit" value="Submit"
            onClick={()=>{

              if (reviewBody.length < 60) {
                event.preventDefault();
                alert("Please include a longer review. We'd love to hear your thoughts! At least 60 characters...")
              } else if (isSize && !size || isWidth && !width || isComfort && !comfort || isQuality && !isQuality || isLength && !length || isFit && !fit) {
                event.preventDefault();
                alert("Please let us know about the characteristics!")
              } else if (!rating) {
                event.preventDefault();
                alert("What, no rating?!")
              } else if (!email || email.indexOf('@') === -1) {
                preventDefault();
                alert("Please include your email (we won't share it, promise)")
              } else if (!nickName) {
                preventDefault();
                alert("What should we call you?)")
              }
              else {
                var charEntry = {}
                var photoEntry = []
                if (photo.length > 0) {
                  photoEntry.push(photo)
                }
                submitReview()

                if (size) {
                  charEntry[characteristics.Size.id] = parseInt(size)
                }
                if (width) {
                  charEntry[characteristics.Width.id] = parseInt(width)
                }
                if (comfort) {
                  charEntry[characteristics.Comfort.id] = parseInt(comfort)
                }
                if (quality) {
                  charEntry[characteristics.Quality.id] = parseInt(quality)
                }
                if (length) {
                  charEntry[characteristics.Length.id] = parseInt(length)
                }
                if (fit) {
                  charEntry[characteristics.Fit.id] = parseInt(fit)
                }
                var rec = recommend === true;
                axios({
                  method: 'post',
                  url: '/reviews',
                  data: {
                    "product_id": id,
                    "rating": parseInt(rating),
                    "summary": reviewSummary.toString(),
                    "body": reviewBody.toString(),
                    "recommend": rec,
                    "name": nickName.toString(),
                    "email": email.toString(),
                    "photos": photoEntry,
                    "characteristics": charEntry
                  }
                })
                .catch((error)=> console.log(error));
              }


            }}/>
          </div>

        </form>
      </div>
    </div>
  )
}

export default NewReviewForm
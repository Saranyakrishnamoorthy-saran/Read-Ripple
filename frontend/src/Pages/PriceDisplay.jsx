import React from "react"

export function PriceDisplay({price, offer}){

    

    const originalPrice = parseFloat(price) || 0;
    let discount = parseFloat(offer) || 0;

    discount = Math.min(Math.max(discount, 0),100);
    const formatter = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    })

    

    const discountedAmount = (originalPrice * discount) /100;
    const discountedPrice = originalPrice - discountedAmount; 

    const hasDiscount =  discount> 0;
    return(
        <>
        <div>
            {hasDiscount > 0 ? (
                <p>
                    <span style={{ textDecoration:"line-through", color: "#6c757d"}}>
                        {formatter.format(originalPrice)}
                    </span>{" "}
                    <span style={{color: "red"}}>{discount} % OFF</span> {" "}
                    <span style={{fontWeight:"bold"}}>{formatter.format(discountedPrice)}</span>
                </p>
            ): (
                <p>{formatter.format(originalPrice)}</p>
            )}
        </div>
        </>
    )
}
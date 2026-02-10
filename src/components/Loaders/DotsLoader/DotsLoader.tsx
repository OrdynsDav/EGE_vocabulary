import "./DotsLoader.css"

export function DotsLoader({size}: {size?: 'small' | 'medium' | 'large'}) {
    return (
        <div className={`lds-ellipsis lds-ellipsis--size-${size}`}><div></div><div></div><div></div><div></div></div>
    )
}
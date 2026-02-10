export function UnavailableSection({ animate }: { animate: boolean}) {
    return (
        <>
            <section className="unavailable">
                <div className="container">
                    <div className={`unavailable-wrapper ${animate ? 'section-animate' : ''} flex justify-center-safe items-center flex-col w-fit m-auto`}>
                        <div className="unavailable__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v4"></path>
                                <path d="m16.2 7.8 2.9-2.9"></path>
                                <path d="M18 12h4"></path>
                                <path d="m16.2 16.2 2.9 2.9"></path>
                                <path d="M12 18v4"></path>
                                <path d="m4.9 19.1 2.9-2.9"></path>
                                <path d="M2 12h4"></path>
                                <path d="m4.9 4.9 2.9 2.9"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl text-center mb-3">Данный раздел в&nbsp;разработке</h2>
                        <p className="text-center">Благодарим вас за&nbsp;интерес! Данный раздел находится в&nbsp;стадии разработки и&nbsp;будет доступен в&nbsp;ближайшее время. Мы&nbsp;работаем над тем, чтобы предоставить вам качественный и&nbsp;полезный контент.</p>
                        <p className="unavailable-text text-center">Пожалуйста, загляните к&nbsp;нам позже. Спасибо за&nbsp;понимание!</p>
                    </div>
                </div>
            </section>
        </>
    )
}
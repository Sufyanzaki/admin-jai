import ImageWrapper from "@/components/client/image-wrapper"

export const GoogleIcon = (props: {className?: string})=>{
    return(
       <ImageWrapper src="https://ticketprijs.nl/frontend/src/images/google_icon.png" alt="google" {...props} />
    )
}

export const FacebookIcon = (props: {className?: string})=>{
    return(
       <ImageWrapper src={'/assets/facebook.png'} alt="google" {...props} />
    )
}

export const dashboardUserIcon = () => {
    return (
        <figure className="m-0">
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.2691 28.7551C27.1116 28.7326 26.9091 28.7326 26.7291 28.7551C22.7691 28.6201 19.6191 25.3801 19.6191 21.3976C19.6191 17.3251 22.9041 14.0176 26.9991 14.0176C31.0716 14.0176 34.3791 17.3251 34.3791 21.3976C34.3566 25.3801 31.2291 28.6201 27.2691 28.7551Z" stroke="#292D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M42.1659 43.605C38.1609 47.2725 32.8509 49.5 27.0009 49.5C21.1509 49.5 15.8409 47.2725 11.8359 43.605C12.0609 41.49 13.4109 39.42 15.8184 37.8C21.9834 33.705 32.0634 33.705 38.1834 37.8C40.5909 39.42 41.9409 41.49 42.1659 43.605Z" stroke="#292D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M27 49.5C39.4264 49.5 49.5 39.4264 49.5 27C49.5 14.5736 39.4264 4.5 27 4.5C14.5736 4.5 4.5 14.5736 4.5 27C4.5 39.4264 14.5736 49.5 27 49.5Z" stroke="#292D32" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
        </figure>
    )
}

export const dashboardLocationIcon = () => {
    return(
        <figure className="m-0">
            <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.6665 30.2175C31.5435 30.2175 34.6865 27.0745 34.6865 23.1975C34.6865 19.3205 31.5435 16.1775 27.6665 16.1775C23.7894 16.1775 20.6465 19.3205 20.6465 23.1975C20.6465 27.0745 23.7894 30.2175 27.6665 30.2175Z" stroke="#292D32" strokeWidth="2.5"/>
                <path d="M8.81183 19.1025C13.2443 -0.382495 42.1118 -0.359994 46.5218 19.125C49.1093 30.555 41.9993 40.23 35.7668 46.215C31.2443 50.58 24.0893 50.58 19.5443 46.215C13.3343 40.23 6.22433 30.5325 8.81183 19.1025Z" stroke="#292D32" strokeWidth="2.5"/>
            </svg>
        </figure>
    )
}

export const dashboardEnvelopIcon = ()=>{
    return(
            <figure className="m-0">
                <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38.584 46.125H16.084C9.33398 46.125 4.83398 42.75 4.83398 34.875V19.125C4.83398 11.25 9.33398 7.875 16.084 7.875H38.584C45.334 7.875 49.834 11.25 49.834 19.125V34.875C49.834 42.75 45.334 46.125 38.584 46.125Z" stroke="#292D32" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M38.584 20.25L31.5415 25.875C29.224 27.72 25.4215 27.72 23.104 25.875L16.084 20.25" stroke="#292D32" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </figure>

    )
}

export const BookmarkIcon = ()=>{
    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4974 40.8334H27.4974C36.6641 40.8334 40.3307 37.1667 40.3307 28.0001V17.0001C40.3307 7.83341 36.6641 4.16675 27.4974 4.16675H16.4974C7.33073 4.16675 3.66406 7.83341 3.66406 17.0001V28.0001C3.66406 37.1667 7.33073 40.8334 16.4974 40.8334Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.1693 4.97314V23.2698C31.1693 26.8815 28.5843 28.2931 25.4126 26.3865L22.9926 24.9381C22.4426 24.6081 21.5626 24.6081 21.0126 24.9381L18.5926 26.3865C15.4209 28.2748 12.8359 26.8815 12.8359 23.2698V4.97314" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.4974 40.8334H27.4974C36.6641 40.8334 40.3307 37.1667 40.3307 28.0001V17.0001C40.3307 7.83341 36.6641 4.16675 27.4974 4.16675H16.4974C7.33073 4.16675 3.66406 7.83341 3.66406 17.0001V28.0001C3.66406 37.1667 7.33073 40.8334 16.4974 40.8334Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.1693 4.97314V23.2698C31.1693 26.8815 28.5843 28.2931 25.4126 26.3865L22.9926 24.9381C22.4426 24.6081 21.5626 24.6081 21.0126 24.9381L18.5926 26.3865C15.4209 28.2748 12.8359 26.8815 12.8359 23.2698V4.97314" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export const ChatIcon = ()=>{
    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 1.75C26.5068 1.75 30.0517 1.95386 32.8447 2.49121C35.6313 3.02735 37.5772 3.87873 38.9678 5.10449C41.7372 7.5459 42.75 11.8739 42.75 20.0557C42.75 25.3426 42.2811 29.3541 40.9365 32.0205C40.2818 33.3189 39.4333 34.267 38.3438 34.9023C37.2469 35.5419 35.8154 35.917 33.917 35.917C31.6594 35.917 30.0166 36.4218 28.7539 37.2773C27.5136 38.1177 26.7552 39.2237 26.1582 40.1631C25.5213 41.1653 25.113 41.8824 24.5098 42.4238C23.9896 42.8905 23.2806 43.25 22 43.25C20.7201 43.2499 20.0122 42.8904 19.4922 42.4238C18.8888 41.8824 18.4798 41.1653 17.8428 40.1631C17.2458 39.2237 16.4873 38.1177 15.2471 37.2773C13.9843 36.4218 12.3416 35.917 10.084 35.917C8.19211 35.917 6.7637 35.5317 5.66699 34.8789C4.57548 34.2291 3.72393 33.2614 3.06641 31.9463C1.71867 29.2505 1.25001 25.2344 1.25 20.0557C1.25 11.9754 2.26073 7.64001 5.03613 5.17285C6.42935 3.93443 8.37776 3.06762 11.1621 2.51758C13.9531 1.96626 17.496 1.75 22 1.75Z" stroke="#212135" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="14.6673" cy="20.6666" r="1.83333" fill="#212135"/>
            <circle cx="21.9993" cy="20.6666" r="1.83333" fill="#212135"/>
            <circle cx="29.3333" cy="20.6666" r="1.83333" fill="#212135"/>
        </svg>

    )
}

export const UsersIcon = ()=>{
    return (
        <svg width="52" height="45" viewBox="0 0 52 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 40.75C20.4701 40.75 22.8089 40.6615 24.6514 40.4355C26.5038 40.2084 27.7608 39.8522 28.624 39.376C29.4419 38.9247 29.9365 38.3504 30.2539 37.5625C30.5916 36.7241 30.75 35.589 30.75 34C30.75 32.411 30.5916 31.2759 30.2539 30.4375C29.9365 29.6496 29.4419 29.0753 28.624 28.624C27.7608 28.1478 26.5038 27.7916 24.6514 27.5645C22.8089 27.3385 20.4701 27.25 17.5 27.25C14.5299 27.25 12.1911 27.3385 10.3486 27.5645C8.49619 27.7916 7.23917 28.1478 6.37598 28.624C5.55811 29.0753 5.06353 29.6496 4.74609 30.4375C4.40836 31.2759 4.25 32.411 4.25 34C4.25 35.589 4.40836 36.7241 4.74609 37.5625C5.06353 38.3504 5.55811 38.9247 6.37598 39.376C7.23917 39.8522 8.49619 40.2084 10.3486 40.4355C12.1911 40.6615 14.5299 40.75 17.5 40.75Z" stroke="#212135" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.5 4.25C13.0033 4.25 9.25 8.10632 9.25 13C9.25 17.8937 13.0033 21.75 17.5 21.75C21.9967 21.75 25.75 17.8937 25.75 13C25.75 8.10632 21.9967 4.25 17.5 4.25Z" stroke="#212135" stroke-width="2.5"/>
            <path d="M30 8C34.2 8 37 11.25 37 14.5C37 17.75 34.2 21 30 21" stroke="#212135" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M37.4667 37C43.5333 37 47 36.2143 47 31.5C47 26.7857 43.5333 26 34 26" stroke="#212135" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export const BagIcon = ()=>{
    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.1673 10.5833C30.709 5.69438 27.5007 2.33325 22.0007 2.33325C16.5007 2.33325 13.2923 5.69439 12.834 10.5833" stroke="#212135" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 43.25C26.5071 43.25 30.0608 43.0577 32.8643 42.5645C35.6667 42.0714 37.6247 41.293 39.0176 40.1904C41.7449 38.0313 42.75 34.2579 42.75 27.083C42.75 22.8163 42.3981 19.7242 41.5098 17.4561C40.5178 14.9234 38.8254 13.3342 35.8408 12.334C32.7529 11.2992 28.3349 10.917 22 10.917C15.6651 10.917 11.2471 11.2992 8.15918 12.334C5.17456 13.3342 3.48218 14.9234 2.49023 17.4561C1.60194 19.7242 1.25002 22.8163 1.25 27.083C1.25 34.2579 2.25515 38.0313 4.98242 40.1904C6.37533 41.293 8.33335 42.0714 11.1357 42.5645C13.9392 43.0577 17.4929 43.25 22 43.25Z" stroke="#212135" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export const MessageIcon = ()=>{
    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.66602 16.0834C3.66602 9.66675 7.33268 6.91675 12.8327 6.91675H31.166C36.666 6.91675 40.3327 9.66675 40.3327 16.0834V28.9167C40.3327 35.3334 36.666 38.0834 31.166 38.0834H12.8327" stroke="#292D32" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M31.1673 17L25.429 21.5833C23.5406 23.0867 20.4423 23.0867 18.554 21.5833L12.834 17" stroke="#292D32" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.66602 30.75H14.666" stroke="#292D32" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.66602 23.4167H9.16602" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    )
}

export const CheckListIcon = ()=>{
    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.166 36.25H38.4993" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.166 23.4167H38.4993" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.166 10.5833H38.4993" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.5 10.5834L7.33333 12.4167L12.8333 6.91675" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.5 23.4167L7.33333 25.25L12.8333 19.75" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.5 36.2499L7.33333 38.0833L12.8333 32.5833" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

export const HexagonUser = ()=>{
    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.6476 16.2301V28.7701C38.6476 30.8234 37.5476 32.7302 35.7693 33.7752L24.8793 40.0635C23.1009 41.0901 20.9009 41.0901 19.1043 40.0635L8.21427 33.7752C6.43594 32.7485 5.33594 30.8417 5.33594 28.7701V16.2301C5.33594 14.1768 6.43594 12.2701 8.21427 11.2251L19.1043 4.93675C20.8826 3.91008 23.0826 3.91008 24.8793 4.93675L35.7693 11.2251C37.5476 12.2701 38.6476 14.1585 38.6476 16.2301Z" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22.0002 20.6666C24.3594 20.6666 26.2719 18.7541 26.2719 16.3949C26.2719 14.0357 24.3594 12.1233 22.0002 12.1233C19.641 12.1233 17.7285 14.0357 17.7285 16.3949C17.7285 18.7541 19.641 20.6666 22.0002 20.6666Z" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29.3327 31.0432C29.3327 27.7432 26.051 25.0667 21.9993 25.0667C17.9477 25.0667 14.666 27.7432 14.666 31.0432" stroke="#292D32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}
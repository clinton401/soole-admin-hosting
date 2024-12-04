import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren{
    name?: string;
    dark?: boolean;
    light?: boolean;
    notTop?: boolean;
    noPadding?: boolean;
    className?: string;
    noWrapper?: boolean;
    wrapperClassName?: string;
}

export default function Section(props: SectionProps) {
    const classname = `
        ${!props.notTop ? '_top': ''} 
        ${props.noPadding ? 'no-padding' :''} 
        ${props.name} 
        ${props.dark ? 'bg-color':''}
         ${props.light ? 'llight-bg-color':''}
        ${props.className}
        `.replaceAll('undefined','').trim();
    return (
        <section
            className={classname}
        >
            {
                props.noWrapper ? (
                    <>
                        {props.children}
                    </>
                ) : (
                    <div className={((props.wrapperClassName || '') + ' ' + "wrapper").trim()}>
                        { props.children }
                    </div>
                )
            }
        </section>
    )
}
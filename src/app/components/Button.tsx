
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    link?: string;
    onClick?: () => void;
    id?: string;
    className?: string;
    loading?: boolean;
    label: string;
    icon?: string;
}

export default function Button(props: ButtonProps) {
    const classvariations = `
    bg-[#D2AC47] 
    flex
  sm:w-[137.5px] sm:h-[38px] xl:w-[172px] xl:h-[36px]  p-6 text-nowrap
     justify-center items-center rounded-full
    ${props.className}
    `.trim().replaceAll('undefined', '');

    if (props.link) {
        return (
            <Link
                href={props.link}
                className={classvariations}
                id={props.id}
            >
                {props.label}
                {props.icon && (
                    <Image
                        src={props.icon}
                        alt="icon"
                        width={20}
                        height={20}
                        className="inline-block mr-2"
                    />
                )}
            </Link>
        );
    }

    return (
        <button
            className={classvariations}
            id={props.id}
            onClick={() => props.onClick && props.onClick()}
            data-loading={props.loading}
            disabled={props.loading}
        >
            {props.loading && <div className="spinner"></div>}
            {props.loading ? (
                <>&nbsp;</>
            ) : (
                <>
                    {props.icon && (
                        <Image
                            src={props.icon}
                            alt="icon"
                            width={20}
                            height={20}
                            className="inline-block mr-2"
                        />
                    )}
                    {props.label}
                </>
            )}
        </button>
    );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const pages = [
  { href: '/project', title: 'О проекте', id: '1' },
  { href: '/location', title: 'Расположение', id: '2' },
  { href: '/architecture', title: 'Архитектура', id: '3' },
  { href: '/infrastructure', title: 'Инфраструктура', id: '4' },
  { href: '/layouts', title: 'Планировки', id: '5' },
  { href: '/parking', title: 'Паркинг', id: '6' },
  { href: '/contacts', title: 'Контакты', id: '7' },
];

const Pagination = ({ currentPath }) => {
  return (
    <div
      className='pagination'
      style={currentPath == '/contacts' ? { bottom: 140 } : {}}
    >
      {currentPath == '/' ? (
        <Image
          src='images/pagination.svg'
          width={4}
          height={4}
          alt='point'
          style={{ marginBottom: 8 }}
        />
      ) : (
        <Link href={'/'} title='Главная'>
          <Image src='images/pagination.svg' width={4} height={4} alt='point' />
        </Link>
      )}

      {pages.map((page) =>
        currentPath == page.href ? (
          <div className='pagination__active' key={page.id}>
            <span>{page.title}</span>
            <Image
              src='images/pagination-active.svg'
              width={32}
              height={73}
              alt='point'
            />
          </div>
        ) : (
          <Link href={page.href} key={page.id} title={page.title}>
            <Image
              src='images/pagination.svg'
              width={4}
              height={4}
              alt='point'
            />
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;

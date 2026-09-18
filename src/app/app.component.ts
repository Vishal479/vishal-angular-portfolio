import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  menuOpen = false;
  skills = [
    { name: 'Angular', value: 88, icon: 'A', color: '#dd0031' },
    { name: 'TypeScript', value: 82, icon: 'TS', color: '#3178c6' },
    { name: 'JavaScript', value: 85, icon: 'JS', color: '#e8c900' },
    { name: 'HTML', value: 92, icon: '5', color: '#e34f26' },
    { name: 'CSS / SCSS', value: 86, icon: '3', color: '#1572b6' },
    { name: 'Bootstrap', value: 80, icon: 'B', color: '#7952b3' },
    { name: 'NgRx', value: 70, icon: 'N', color: '#a855f7' },
    { name: 'GSAP', value: 65, icon: 'G', color: '#88ce02' }
  ];
  projects = [
    { title: 'SpotYourDeal', type: 'Admin Panel', desc: 'E-commerce administration dashboard with reusable UI components.', tags: ['Angular', 'Bootstrap', 'NgRx'], number: '01', visual: 'visual-one' },
    { title: 'Reward System', type: 'Customer Rewards', desc: 'Customer reward and loyalty management experience.', tags: ['Angular', 'TypeScript', 'REST API'], number: '02', visual: 'visual-two' },
    { title: 'Eemo System', type: 'Web Application', desc: 'Frontend experience for an e-commerce and user management system.', tags: ['Angular', 'SCSS', 'JavaScript'], number: '03', visual: 'visual-three' },
    { title: 'InstantPay', type: 'Website & Dashboard', desc: 'Payment gateway website and dashboard interface.', tags: ['Angular', 'TypeScript', 'REST API'], number: '04', visual: 'visual-four' },
    { title: 'Indian Airlines', type: 'ML Project', desc: 'Academic project exploring machine learning with Python.', tags: ['Python', 'Machine Learning'], number: '05', visual: 'visual-five' }
  ];
  experience = [
    { company: 'InstantPay India Ltd', role: 'Frontend Developer', period: 'Current / Recent', detail: 'Building and maintaining fintech web interfaces.' },
    { company: 'Monet Networks Pvt Ltd', role: 'Frontend Developer', period: 'Previous', detail: 'Worked on responsive frontend application interfaces.' },
    { company: 'Mckinsol Consulting Pvt Ltd', role: 'Frontend Developer', period: 'Previous', detail: 'Contributed to frontend development and web projects.' }
  ];

  ngAfterViewInit(): void {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro.from('.nav-brand', { y: -18, opacity: 0, duration: .7 })
        .from('.hero-kicker, .hero-title, .hero-role, .hero-copy, .hero-actions', {
          y: 30, opacity: 0, duration: .75, stagger: .12
        }, '-=.35')
        .from('.hero-art', { scale: .82, opacity: 0, rotate: -5, duration: 1.1 }, '-=.65');

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 42, opacity: 0, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        });
      });

      gsap.utils.toArray<HTMLElement>('.skill-meter').forEach((meter) => {
        const target = meter.dataset['value'] ?? '0';
        gsap.fromTo(meter, { '--meter': '0%' }, {
          '--meter': `${target}%`, duration: 1.35, ease: 'power2.out',
          scrollTrigger: { trigger: meter, start: 'top 90%', once: true }
        });
      });

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
        card.addEventListener('mouseenter', () => gsap.to(card, { y: -7, duration: .25, ease: 'power2.out' }));
        card.addEventListener('mouseleave', () => gsap.to(card, { y: 0, duration: .3, ease: 'power2.out' }));
      });
    });
    this.cleanup = () => ctx.revert();
  }

  private cleanup: (() => void) | undefined;
  ngOnDestroy(): void { this.cleanup?.(); }
}